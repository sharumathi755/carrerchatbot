export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function formatMessageContent(content: string): string {
  // Convert markdown-ish content to HTML-safe structured output
  // Handle **bold**, line breaks, and bullet points
  let html = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italics: *text* (but not ** which is bold)
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  // Split into lines and group bullet points
  const lines = html.split('\n');
  let result = '';
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      if (!inList) {
        result += '<ul class="list-disc pl-5 space-y-1 my-1">';
        inList = true;
      }
      result += `<li>${trimmed.slice(2)}</li>`;
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes(' ')) {
      // Skip, handled inline
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += `<p class="font-semibold mt-2 mb-1">${trimmed}</p>`;
    } else if (trimmed.match(/^\d+\.\s/)) {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += `<p class="ml-1">${trimmed}</p>`;
    } else if (trimmed === '') {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += '';
    } else {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      // Check if it's a section header (starts with ** and ends with **)
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const inner = trimmed.slice(2, -2);
        result += `<p class="font-semibold mt-3 mb-1">${inner}</p>`;
      } else {
        result += `<p class="my-1">${trimmed}</p>`;
      }
    }
  }
  if (inList) result += '</ul>';

  return result;
}
