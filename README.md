
# 🤖 Career Guidance Chatbot

Career Guidance Chatbot is a web-based application that helps students and developers get guidance about programming technologies, learning paths, courses, certifications, and career development.

The application provides a conversational chat interface where users can ask career and technology-related questions and receive relevant guidance.

> **Note:** This project was developed with the assistance of Bolt as a learning project to explore React, TypeScript, Supabase, and chatbot application development.

## 🚀 Features

* 🤖 Career guidance chatbot
* 💬 Interactive chat interface
* 🆕 Create new chat sessions
* 💾 Save chat conversations
* 📖 View previous conversations
* 🗑️ Delete conversations
* 📝 Chat title management
* 📚 Technology learning guidance
* 🎓 Course and certification information
* 💼 Career development guidance
* 📱 Responsive user interface

## 🛠️ Technologies Used

### Frontend

* React
* TypeScript
* HTML5
* CSS3
* Tailwind CSS

### Backend & Database

* Supabase
* PostgreSQL
* Supabase Edge Functions

### Development Tools

* Vite
* ESLint
* npm

## 🧠 How the Application Works

The basic flow of the application is:

```text
User
  ↓
React Frontend
  ↓
Supabase
  ↓
career-chat Edge Function
  ↓
Chat Processing
  ↓
Response
  ↓
React Frontend
  ↓
User
```

When a user enters a question, the React frontend sends the request to the backend.

The `career-chat` Supabase Edge Function processes the request and returns a response to the frontend.

The chat sessions and messages are stored in the Supabase database so that previous conversations can be accessed later.

## 💬 Chat Management

The application allows users to:

* Create a new conversation
* Send messages
* Receive chatbot responses
* View previous conversations
* Continue existing conversations
* Delete conversations

A chat session can contain multiple messages.

```text
Chat Session
     │
     ├── User Message
     ├── Assistant Response
     ├── User Message
     └── Assistant Response
```

## 🗄️ Database

The application uses **Supabase PostgreSQL** as the database.

### Main Tables

#### `chat_sessions`

Stores information about conversations.

```text
id
title
created_at
```

#### `chat_messages`

Stores individual messages.

```text
id
session_id
role
content
created_at
```

The `session_id` connects messages with their corresponding chat session.

The `role` identifies whether a message was sent by the:

```text
user
```

or:

```text
assistant
```

## ⚡ Supabase Edge Function

The project contains a Supabase Edge Function named:

```text
career-chat
```

Its purpose is to handle chatbot-related backend processing.

The general communication flow is:

```text
React
  ↓
career-chat
  ↓
Process Request
  ↓
Generate Response
  ↓
React
```

## 📂 Project Structure

```text
CareerChatbot/
│
├── .bolt/
│
├── public/
│
├── src/
│   ├── lib/
│   │   ├── format.ts
│   │   └── supabase.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── supabase/
│   ├── functions/
│   │   └── career-chat/
│   │       └── index.ts
│   │
│   └── migrations/
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/sharumathi755/carrerchatbot.git
```

> Replace `carrerchatbot` with your actual GitHub repository name if it is different.

### 2. Open the project

```bash
cd carrerchatbot
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Supabase

Create a Supabase project and configure the required environment variables.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not upload private keys, passwords, or `.env` files containing sensitive information to GitHub.

### 5. Start the application

```bash
npm run dev
```

The application will start using the Vite development server.

## 🔧 Available Commands

### Start development server

```bash
npm run dev
```

### Build the application

```bash
npm run build
```

### Check TypeScript

```bash
npm run typecheck
```

### Run ESLint

```bash
npm run lint
```

### Preview production build

```bash
npm run preview
```

## 📸 Screenshots

![Career Chatbot](Screenshot%20%28443%29.png)

## 🎯 Learning Outcomes

Through this project, I explored:

* React component development
* TypeScript
* Vite
* Tailwind CSS
* Supabase
* PostgreSQL
* Supabase Edge Functions
* CRUD operations
* Database integration
* Chat session management
* Frontend and backend communication
* Responsive UI development
* Chatbot application concepts

## 🔮 Future Improvements

Possible future improvements include:

* 🔐 User authentication
* 👤 Individual user accounts
* 🔒 User-specific chat history
* 🤖 Integration with a dedicated AI/LLM API
* 📄 Resume analysis
* 🎯 Personalized career recommendations
* 📊 Skill assessment
* 💼 Job recommendations
* 📚 Personalized learning roadmaps

## 👩‍💻 Author

**Sharumathi G**

GitHub: https://github.com/sharumathi755

---

⭐ This project was created as a learning project to explore modern web development and chatbot application concepts.
