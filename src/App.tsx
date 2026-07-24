import { useEffect, useRef, useState } from 'react';
import {
  Plus,
  MessageSquare,
  Trash2,
  Send,
  Sparkles,
  Map,
  GraduationCap,
  FileText,
  DollarSign,
  Award,
  BookOpen,
  Menu,
  X,
  Bot,
  User,
} from 'lucide-react';
import { supabase, type ChatSession, type ChatMessage } from '@/lib/supabase';
import { formatTime, formatMessageContent } from '@/lib/format';

const SUGGESTIONS = [
  { icon: Map, label: 'I want to learn Java', color: 'text-emerald-400' },
  { icon: GraduationCap, label: 'Where can I learn C programming?', color: 'text-blue-400' },
  { icon: BookOpen, label: 'Best resources to learn Python', color: 'text-cyan-400' },
  { icon: FileText, label: 'How can I improve my resume?', color: 'text-amber-400' },
  { icon: DollarSign, label: 'What is the salary for a React developer?', color: 'text-rose-400' },
  { icon: Award, label: 'Certifications for AWS', color: 'text-violet-400' },
];

function App() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Load messages when active session changes
  useEffect(() => {
    if (activeSessionId) {
      loadMessages(activeSessionId);
    } else {
      setMessages([]);
    }
  }, [activeSessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  async function loadSessions() {
    setLoadingSessions(true);
    const { data } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('created_at', { ascending: false });
    setSessions(data ?? []);
    setLoadingSessions(false);
  }

  async function loadMessages(sessionId: string) {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    setMessages(data ?? []);
  }

  async function createNewChat() {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ title: 'New chat' })
      .select()
      .single();

    if (error || !data) return;

    setSessions((prev) => [data, ...prev]);
    setActiveSessionId(data.id);
    setMessages([]);
    setSidebarOpen(false);
  }

  async function deleteSession(id: string) {
    await supabase.from('chat_sessions').delete().eq('id', id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(null);
      setMessages([]);
    }
  }

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    setInput('');

    let sessionId = activeSessionId;

    // Create a new session if none active
    if (!sessionId) {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({ title: content.slice(0, 40) })
        .select()
        .single();
      if (error || !data) return;
      sessionId = data.id;
      setSessions((prev) => [data, ...prev]);
      setActiveSessionId(data.id);
    } else {
      // Update title if it's still "New chat"
      const session = sessions.find((s) => s.id === sessionId);
      if (session && session.title === 'New chat') {
        const newTitle = content.slice(0, 40);
        await supabase.from('chat_sessions').update({ title: newTitle }).eq('id', sessionId);
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? { ...s, title: newTitle } : s)),
        );
      }
    }

    // Save user message to DB
    const { data: userMsg } = await supabase
      .from('chat_messages')
      .insert({ session_id: sessionId, role: 'user', content })
      .select()
      .single();

    if (userMsg) {
      setMessages((prev) => [...prev, userMsg]);
    }

    setLoading(true);

    // Build conversation context
    const conversationMessages = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user' as const, content },
    ];

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-chat`;
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: conversationMessages }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const json = await res.json();
      const reply = json.reply ?? 'Sorry, I could not generate a response.';

      const { data: assistantMsg } = await supabase
        .from('chat_messages')
        .insert({ session_id: sessionId, role: 'assistant', content: reply })
        .select()
        .single();

      if (assistantMsg) {
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch {
      const errorContent = 'Sorry, something went wrong. Please try again.';
      const { data: errorMsg } = await supabase
        .from('chat_messages')
        .insert({ session_id: sessionId!, role: 'assistant', content: errorContent })
        .select()
        .single();
      if (errorMsg) {
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-30 w-72 h-full bg-[#1a1a1a] border-r border-white/5 flex flex-col transition-transform duration-300`}
      >
        <div className="p-3">
          <button
            onClick={createNewChat}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {loadingSessions ? (
            <div className="px-3 py-4 text-sm text-gray-500">Loading chats...</div>
          ) : sessions.length === 0 ? (
            <div className="px-3 py-4 text-sm text-gray-500">No conversations yet</div>
          ) : (
            sessions.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setActiveSessionId(s.id);
                  setSidebarOpen(false);
                }}
                className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-colors mb-0.5 ${
                  activeSessionId === s.id ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="flex-1 truncate text-sm">{s.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(s.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-gray-400">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-200">CareerCompass</div>
              <div className="text-xs text-gray-500">AI Career Guide</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main chat area */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">CareerCompass</h1>
              <p className="text-xs text-gray-500">
                {activeSession ? formatTime(activeSession.created_at) : 'AI Career Guidance'}
              </p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 && !loading ? (
            <div className="h-full flex flex-col items-center justify-center px-4 py-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Welcome to CareerCompass</h2>
              <p className="text-gray-400 text-center max-w-md mb-8">
                Your AI career guidance counselor. Ask me about courses, roadmaps, resumes,
                salaries, certifications, and learning resources.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => sendMessage(s.label)}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all text-left group"
                  >
                    <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} />
                    <span className="text-sm text-gray-300 group-hover:text-white">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'assistant' ? '' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                        : 'bg-white/10'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div
                    className={`flex-1 min-w-0 ${
                      msg.role === 'assistant' ? '' : 'flex flex-col items-end'
                    }`}
                  >
                    <div className="text-xs text-gray-500 mb-1">
                      {msg.role === 'assistant' ? 'CareerCompass' : 'You'}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'assistant'
                          ? 'bg-[#1a1a1a] text-gray-100'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      <div
                        className="prose-chat"
                        dangerouslySetInnerHTML={{ __html: formatMessageContent(msg.content) }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">CareerCompass</div>
                    <div className="rounded-2xl px-4 py-3 bg-[#1a1a1a] inline-flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="px-4 py-4 border-t border-white/5 bg-[#0f0f0f]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 bg-[#1a1a1a] rounded-2xl border border-white/10 focus-within:border-emerald-500/50 transition-colors px-4 py-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about courses, roadmaps, resumes, salaries..."
                className="flex-1 bg-transparent outline-none resize-none text-sm text-gray-100 placeholder-gray-500 max-h-[200px]"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:hover:bg-emerald-600 flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">
              CareerCompass provides general guidance. Always research current details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
