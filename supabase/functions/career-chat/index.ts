import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

// ─── Technology Knowledge Base ──────────────────────────────────────────────

interface TechInfo {
  aliases: string[];
  displayName: string;
  category: string;
  roadmap: { phase: string; items: string[] }[];
  resources: { name: string; desc: string }[];
  courses: { name: string; provider: string; free: boolean }[];
  certifications: { name: string; desc: string }[];
  salaryRange: string;
  tips: string[];
}

const TECH_DB: Record<string, TechInfo> = {
  java: {
    aliases: ["java"],
    displayName: "Java",
    category: "Programming Language",
    roadmap: [
      {
        phase: "Phase 1 — Core Java Basics (Weeks 1-4)",
        items: [
          "Set up JDK and an IDE (IntelliJ IDEA or Eclipse)",
          "Learn syntax: variables, data types, operators, control flow",
          "Understand arrays and strings",
          "Practice loops (for, while, do-while) and conditionals",
        ],
      },
      {
        phase: "Phase 2 — OOP Concepts (Weeks 4-8)",
        items: [
          "Classes and objects — the foundation of Java",
          "Inheritance and method overriding",
          "Polymorphism (method overloading & overriding)",
          "Encapsulation and access modifiers (public, private, protected)",
          "Abstraction using abstract classes and interfaces",
        ],
      },
      {
        phase: "Phase 3 — Advanced Java (Weeks 8-14)",
        items: [
          "Collections Framework (List, Set, Map, Queue)",
          "Exception handling (try-catch-finally, custom exceptions)",
          "Generics and wildcards",
          "Multithreading and concurrency",
          "Lambda expressions and Streams API",
          "File I/O and serialization",
        ],
      },
      {
        phase: "Phase 4 — Java Ecosystem & Frameworks (Weeks 14+)",
        items: [
          "JDBC for database connectivity",
          "Build tools: Maven or Gradle",
          "Spring Core and Spring Boot for backend development",
          "Hibernate/JPA for ORM",
          "RESTful web services with Spring MVC",
          "JUnit and Mockito for testing",
        ],
      },
    ],
    resources: [
      { name: "Oracle Java Tutorials", desc: "Official docs covering all Java topics (docs.oracle.com)" },
      { name: "JavaPoint", desc: "Comprehensive Java tutorials with examples (javatpoint.com)" },
      { name: "Baeldung", desc: "In-depth Spring and Java tutorials (baeldung.com)" },
      { name: "GeeksforGeeks Java", desc: "Practice problems and explanations (geeksforgeeks.org/java)" },
      { name: "Java Brains (YouTube)", desc: "Excellent video tutorials on Java and Spring" },
      { name: "freeCodeCamp Java (YouTube)", desc: "Full 9-hour Java course for beginners" },
    ],
    courses: [
      { name: "Java Programming and Software Engineering Fundamentals", provider: "Duke University (Coursera)", free: false },
      { name: "Java Tutorial for Complete Beginners", provider: "Udemy", free: true },
      { name: "Spring Boot Microservices", provider: "Udemy", free: false },
      { name: "Java Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Object-Oriented Programming in Java", provider: "UCSD (Coursera)", free: false },
    ],
    certifications: [
      { name: "Oracle Certified Associate (OCA) Java Programmer", desc: "Entry-level cert validating core Java skills" },
      { name: "Oracle Certified Professional (OCP) Java Programmer", desc: "Advanced cert for experienced Java developers" },
      { name: "Spring Professional Certification", desc: "Validates Spring Framework expertise" },
    ],
    salaryRange: "Java Developer: $75,000 (entry) – $160,000+ (senior) in the US",
    tips: [
      "Master OOP thoroughly before touching frameworks — it's the backbone of Java",
      "Build small console apps first, then move to GUI (JavaFX) or web (Spring)",
      "Practice DSA in Java — it's the most common interview language",
      "Contribute to open-source Java projects on GitHub",
    ],
  },

  c: {
    aliases: ["c", "c language", "c programming", "c lang", "c-programming"],
    displayName: "C",
    category: "Programming Language",
    roadmap: [
      {
        phase: "Phase 1 — C Basics (Weeks 1-3)",
        items: [
          "Install a compiler (GCC) and IDE (Code::Blocks or VS Code)",
          "Learn syntax: variables, data types, printf/scanf, operators",
          "Understand control flow: if-else, switch, loops (for, while, do-while)",
          "Practice basic input/output programs",
        ],
      },
      {
        phase: "Phase 2 — Functions & Arrays (Weeks 3-6)",
        items: [
          "Functions: declaration, definition, call-by-value vs call-by-reference",
          "Recursion and its applications",
          "Arrays: 1D and 2D arrays, array manipulation",
          "Strings in C (character arrays, string.h functions)",
        ],
      },
      {
        phase: "Phase 3 — Pointers & Memory (Weeks 6-10)",
        items: [
          "Pointers — the most important concept in C",
          "Pointer arithmetic and pointer-to-pointer",
          "Dynamic memory allocation (malloc, calloc, realloc, free)",
          "Structures and unions",
          "File handling (fopen, fread, fwrite, fclose)",
        ],
      },
      {
        phase: "Phase 4 — Advanced C (Weeks 10+)",
        items: [
          "Data structures: linked lists, stacks, queues, trees using C",
          "Bit manipulation and bitwise operators",
          "Command-line arguments (argc, argv)",
          "Preprocessor directives and macros",
          "Multi-file programming and header files",
        ],
      },
    ],
    resources: [
      { name: "Learn-C.org", desc: "Interactive C tutorial with built-in compiler (learn-c.org)" },
      { name: "Programiz C Programming", desc: "Step-by-step tutorials with examples (programiz.com/c-programming)" },
      { name: "GeeksforGeeks C", desc: "Extensive C articles and practice problems (geeksforgeeks.org/c)" },
      { name: "C Programming by Navin (YouTube)", desc: "Popular Hindi/English C tutorial series" },
      { name: "freeCodeCamp C (YouTube)", desc: "Full C programming course for beginners" },
      { name: "The C Programming Language (Book)", desc: "Classic book by Kernighan & Ritchie (K&R)" },
    ],
    courses: [
      { name: "C Programming For Beginners", provider: "Udemy", free: false },
      { name: "C for Everyone: Programming Fundamentals", provider: "UCSC (Coursera)", free: false },
      { name: "C Programming Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Introduction to C", provider: "Codecademy", free: true },
    ],
    certifications: [
      { name: "C Programming Language Certified Associate (CLA)", desc: "By the C++ Institute — entry-level C cert" },
      { name: "C Certified Professional Programmer (CLP)", desc: "Advanced C certification by the C++ Institute" },
    ],
    salaryRange: "C Developer: $60,000 (entry) – $130,000+ (senior) in the US; common in embedded/systems roles",
    tips: [
      "Pointers are the heart of C — spend extra time mastering them",
      "Practice implementing data structures from scratch in C",
      "C is foundational for embedded systems, OS development, and game engines",
      "Learn to use a debugger (GDB) early — it saves hours of frustration",
    ],
  },

  cpp: {
    aliases: ["c++", "cpp", "c plus plus"],
    displayName: "C++",
    category: "Programming Language",
    roadmap: [
      {
        phase: "Phase 1 — C++ Basics (Weeks 1-3)",
        items: [
          "Install GCC/G++ and an IDE (Visual Studio or Code::Blocks)",
          "Syntax: variables, data types, I/O (cin/cout), operators",
          "Control flow and loops",
          "Functions and default arguments",
        ],
      },
      {
        phase: "Phase 2 — OOP in C++ (Weeks 3-7)",
        items: [
          "Classes, objects, constructors, destructors",
          "Inheritance (single, multiple, multilevel)",
          "Polymorphism: virtual functions and runtime polymorphism",
          "Encapsulation and friend functions",
          "Operator overloading",
        ],
      },
      {
        phase: "Phase 3 — Advanced C++ (Weeks 7-12)",
        items: [
          "Templates (function and class templates)",
          "STL: containers (vector, map, set), algorithms, iterators",
          "Exception handling (try, throw, catch)",
          "Smart pointers (unique_ptr, shared_ptr)",
          "Lambda expressions and auto keyword (C++11/14/17 features)",
        ],
      },
      {
        phase: "Phase 4 — Specialization (Weeks 12+)",
        items: [
          "Game development with Unreal Engine or SDL",
          "Competitive programming (C++ is the top choice)",
          "System programming and OS concepts",
          "Qt framework for GUI applications",
          "Multi-threading and concurrency",
        ],
      },
    ],
    resources: [
      { name: "LearnCpp.com", desc: "Best free C++ tutorial site — comprehensive and modern (learncpp.com)" },
      { name: "CppReference", desc: "The definitive C++ language reference (cppreference.com)" },
      { name: "GeeksforGeeks C++", desc: "Tutorials and practice problems (geeksforgeeks.org/cpp)" },
      { name: "The Cherno (YouTube)", desc: "Excellent C++ video series covering modern C++" },
      { name: "freeCodeCamp C++ (YouTube)", desc: "Full C++ course for beginners" },
      { name: "Effective Modern C++ (Book)", desc: "By Scott Meyers — must-read for C++11/14" },
    ],
    courses: [
      { name: "C++ Programming Specialization", provider: "Codio (Coursera)", free: false },
      { name: "Beginning C++ Programming", provider: "Udemy", free: false },
      { name: "C++ Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Unreal Engine C++ Developer", provider: "Udemy", free: false },
    ],
    certifications: [
      { name: "C++ Certified Associate Programmer (CPA)", desc: "Entry-level cert by the C++ Institute" },
      { name: "C++ Certified Professional Programmer (CPP)", desc: "Advanced cert by the C++ Institute" },
    ],
    salaryRange: "C++ Developer: $70,000 (entry) – $150,000+ (senior) in the US; high demand in gaming & finance",
    tips: [
      "Master C++ OOP and STL before diving into game engines",
      "C++ is the #1 language for competitive programming — practice on Codeforces",
      "Learn modern C++ (C++11/14/17/20) — avoid old-style C++ habits",
      "Game dev (Unreal Engine) and HFT (High-Frequency Trading) are top C++ career paths",
    ],
  },

  python: {
    aliases: ["python", "python3", "py"],
    displayName: "Python",
    category: "Programming Language",
    roadmap: [
      {
        phase: "Phase 1 — Python Basics (Weeks 1-3)",
        items: [
          "Install Python and set up VS Code or PyCharm",
          "Syntax: variables, data types, f-strings, operators",
          "Control flow: if-elif-else, for loops, while loops",
          "Functions, default/keyword arguments, *args/**kwargs",
        ],
      },
      {
        phase: "Phase 2 — Data Structures in Python (Weeks 3-6)",
        items: [
          "Lists, tuples, dictionaries, sets",
          "List comprehensions and generator expressions",
          "String manipulation and formatting",
          "File handling (open, read, write, with statement)",
        ],
      },
      {
        phase: "Phase 3 — OOP & Advanced Python (Weeks 6-10)",
        items: [
          "Classes, objects, inheritance, dunder methods",
          "Decorators and generators",
          "Exception handling (try-except-finally)",
          "Modules and packages, virtual environments (venv/pip)",
          "Lambda functions, map/filter/reduce",
        ],
      },
      {
        phase: "Phase 4 — Choose Your Path (Weeks 10+)",
        items: [
          "Web Development: Django or Flask/FastAPI",
          "Data Science: NumPy, Pandas, Matplotlib, Scikit-learn",
          "AI/ML: TensorFlow, PyTorch, Hugging Face",
          "Automation/Scripting: Selenium, BeautifulSoup, requests",
          "Desktop GUI: Tkinter or PyQt",
        ],
      },
    ],
    resources: [
      { name: "Python.org Docs", desc: "Official Python documentation (docs.python.org)" },
      { name: "Real Python", desc: "High-quality Python tutorials and articles (realpython.com)" },
      { name: "W3Schools Python", desc: "Beginner-friendly tutorials with online editor (w3schools.com/python)" },
      { name: "Programiz Python", desc: "Step-by-step tutorials (programiz.com/python-programming)" },
      { name: "Corey Schafer (YouTube)", desc: "Excellent Python tutorials covering OOP, decorators, Flask, Django" },
      { name: "freeCodeCamp Python (YouTube)", desc: "Full Python courses from beginner to advanced" },
    ],
    courses: [
      { name: "Python for Everybody", provider: "University of Michigan (Coursera)", free: false },
      { name: "100 Days of Code: The Complete Python Pro Bootcamp", provider: "Udemy (Angela Yu)", free: false },
      { name: "CS50's Introduction to Programming with Python", provider: "Harvard (edX)", free: true },
      { name: "Python Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Google IT Automation with Python", provider: "Google (Coursera)", free: false },
    ],
    certifications: [
      { name: "PCEP – Certified Entry-Level Python Programmer", desc: "By Python Institute — beginner cert" },
      { name: "PCAP – Certified Associate in Python Programming", desc: "Intermediate cert by Python Institute" },
      { name: "PCPP – Certified Professional in Python Programming", desc: "Advanced cert (levels 1 & 2)" },
      { name: "Google Data Analytics Professional Certificate", desc: "Python-focused data career cert (Coursera)" },
    ],
    salaryRange: "Python Developer: $70,000 (entry) – $160,000+ (senior) in the US; AI/ML roles pay top of range",
    tips: [
      "Python is the most versatile language — pick a path (web, data, AI) after basics",
      "Practice on LeetCode/HackerRank using Python — it's the #1 interview language for data roles",
      "Learn virtual environments and pip early to manage dependencies",
      "Build projects: a web scraper, a Flask API, or a data dashboard to stand out",
    ],
  },

  javascript: {
    aliases: ["javascript", "js", "java script"],
    displayName: "JavaScript",
    category: "Programming Language",
    roadmap: [
      {
        phase: "Phase 1 — JavaScript Basics (Weeks 1-3)",
        items: [
          "Set up Node.js and a code editor (VS Code)",
          "Syntax: variables (let, const, var), data types, operators",
          "Control flow: if-else, switch, loops (for, while, for-of, for-in)",
          "Functions: declarations, expressions, arrow functions",
        ],
      },
      {
        phase: "Phase 2 — DOM & Browser APIs (Weeks 3-6)",
        items: [
          "DOM manipulation (getElementById, querySelector, event listeners)",
          "Working with forms and events",
          "Async JavaScript: callbacks, promises, async/await",
          "Fetch API and working with JSON APIs",
          "localStorage and sessionStorage",
        ],
      },
      {
        phase: "Phase 3 — Advanced JavaScript (Weeks 6-10)",
        items: [
          "Closures, scope, and hoisting",
          "Prototypes and the 'this' keyword",
          "ES6+ features: destructuring, spread/rest, template literals, modules",
          "Error handling (try-catch-finally)",
          "Array methods: map, filter, reduce, find, some, every",
        ],
      },
      {
        phase: "Phase 4 — Frameworks & Ecosystem (Weeks 10+)",
        items: [
          "Frontend: React, Vue, or Angular",
          "Backend: Node.js with Express or NestJS",
          "Build tools: Vite, Webpack, npm/yarn",
          "TypeScript for type safety",
          "Testing: Jest, Cypress, Playwright",
        ],
      },
    ],
    resources: [
      { name: "MDN Web Docs", desc: "The gold standard reference for JavaScript (developer.mozilla.org)" },
      { name: "JavaScript.info", desc: "Modern, in-depth JS tutorial (javascript.info)" },
      { name: "freeCodeCamp", desc: "Interactive JS curriculum with certifications (freecodecamp.org)" },
      { name: "Eloquent JavaScript (Book)", desc: "Free online book by Marijn Haverbeke (eloquentjavascript.net)" },
      { name: "Traversy Media (YouTube)", desc: "Practical JS crash courses and project builds" },
      { name: "Fireship (YouTube)", desc: "Quick, modern JS tips and framework overviews" },
    ],
    courses: [
      { name: "The Complete JavaScript Course", provider: "Udemy (Jonas Schmedtmann)", free: false },
      { name: "JavaScript Algorithms and Data Structures", provider: "freeCodeCamp", free: true },
      { name: "Meta Front-End Developer Professional Certificate", provider: "Coursera", free: false },
      { name: "JavaScript: Understanding the Weird Parts", provider: "Udemy", free: false },
      { name: "Full Stack Open", provider: "University of Helsinki", free: true },
    ],
    certifications: [
      { name: "freeCodeCamp JavaScript Certification", desc: "Free, project-based certification (freecodecamp.org)" },
      { name: "Meta Front-End Developer Certificate", desc: "Covers JS, React, and web dev (Coursera)" },
      { name: "W3Schools JavaScript Certificate", desc: "Entry-level exam-based certification" },
    ],
    salaryRange: "JavaScript Developer: $65,000 (entry) – $150,000+ (senior) in the US; full-stack roles pay more",
    tips: [
      "JavaScript is essential for web development — both frontend and backend (Node.js)",
      "Master array methods (map, filter, reduce) — they're used constantly in React",
      "Build projects: a todo app, weather app, or a React dashboard",
      "Learn TypeScript after JS — most production codebases use it",
    ],
  },

  react: {
    aliases: ["react", "reactjs", "react.js", "react js"],
    displayName: "React",
    category: "Frontend Framework",
    roadmap: [
      {
        phase: "Phase 1 — Prerequisites (Weeks 1-2)",
        items: [
          "Solid JavaScript: ES6+, array methods, async/await, destructuring",
          "HTML & CSS fundamentals (flexbox, grid, responsive design)",
          "Understand the DOM and how SPAs work",
          "Learn npm and basic Node.js",
        ],
      },
      {
        phase: "Phase 2 — React Core (Weeks 2-6)",
        items: [
          "Components and JSX",
          "Props and state (useState hook)",
          "Event handling and forms",
          "useEffect hook for side effects",
          "Conditional rendering and list rendering (map)",
        ],
      },
      {
        phase: "Phase 3 — Intermediate React (Weeks 6-10)",
        items: [
          "useContext, useReducer, and custom hooks",
          "React Router for navigation",
          "API integration with fetch/axios",
          "Forms with Formik or React Hook Form",
          "State management: Context API or Redux Toolkit",
        ],
      },
      {
        phase: "Phase 4 — Advanced & Ecosystem (Weeks 10+)",
        items: [
          "Next.js for SSR/SSG and full-stack React",
          "TypeScript with React",
          "Performance: React.memo, useMemo, useCallback, code splitting",
          "Testing: React Testing Library, Jest",
          "Styling: Tailwind CSS, Styled Components, or shadcn/ui",
        ],
      },
    ],
    resources: [
      { name: "React Official Docs", desc: "Best place to start — modern interactive docs (react.dev)" },
      { name: "freeCodeCamp React", desc: "Free React course with projects (freecodecamp.org)" },
      { name: "Josh W. Comeau", desc: "Beautiful, in-depth React tutorials (joshwcomeau.com)" },
      { name: "Epic React by Kent C. Dodds", desc: "Premium, deep-dive React course (epicreact.dev)" },
      { name: "Fireship (YouTube)", desc: "Quick React tips and modern patterns" },
      { name: "Jack Herrington (YouTube)", desc: "Advanced React patterns and TypeScript" },
    ],
    courses: [
      { name: "React — The Complete Guide", provider: "Udemy (Maximilian Schwarzmüller)", free: false },
      { name: "Meta Front-End Developer Professional Certificate", provider: "Coursera", free: false },
      { name: "Full Modern React Tutorial", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Frontend Masters React", provider: "Frontend Masters", free: false },
      { name: "Next.js & React Course", provider: "Udemy (Maximilian)", free: false },
    ],
    certifications: [
      { name: "Meta Front-End Developer Certificate", desc: "Includes React — recognized by employers (Coursera)" },
      { name: "freeCodeCamp Front End Development Certification", desc: "Free, project-based (freecodecamp.org)" },
    ],
    salaryRange: "React Developer: $70,000 (entry) – $160,000+ (senior) in the US; one of the highest-paying frontend roles",
    tips: [
      "Master JavaScript ES6+ before React — hooks are pure JS concepts",
      "Build projects: a movie search app, a shopping cart, or a social media feed",
      "Learn Next.js after React — it's the production standard for React apps",
      "Understand the component lifecycle and when effects re-run",
    ],
  },

  nodejs: {
    aliases: ["node", "nodejs", "node.js", "node js"],
    displayName: "Node.js",
    category: "Backend Runtime",
    roadmap: [
      {
        phase: "Phase 1 — Prerequisites (Weeks 1-2)",
        items: [
          "Solid JavaScript: ES6+, async/await, modules (CommonJS & ESM)",
          "Understand event loop and asynchronous programming",
          "Learn npm: installing, managing dependencies, package.json",
        ],
      },
      {
        phase: "Phase 2 — Node.js Core (Weeks 2-5)",
        items: [
          "Built-in modules: fs, http, path, os, events",
          "Creating a basic HTTP server",
          "Working with streams and buffers",
          "Error handling in async code",
          "Environment variables and configuration",
        ],
      },
      {
        phase: "Phase 3 — Express & APIs (Weeks 5-9)",
        items: [
          "Express.js: routing, middleware, request/response cycle",
          "Building RESTful APIs (CRUD operations)",
          "Connecting to databases (MongoDB with Mongoose or PostgreSQL)",
          "Authentication: JWT, bcrypt, sessions",
          "Input validation with Joi or Zod",
        ],
      },
      {
        phase: "Phase 4 — Production Node.js (Weeks 9+)",
        items: [
          "Advanced frameworks: NestJS or Fastify",
          "WebSockets with Socket.io for real-time apps",
          "Testing: Jest, Supertest",
          "Deployment: Docker, PM2, cloud (AWS, Vercel, Railway)",
          "Security: helmet, CORS, rate limiting, OWASP best practices",
        ],
      },
    ],
    resources: [
      { name: "Node.js Official Docs", desc: "Complete API reference (nodejs.org/docs)" },
      { name: "Node.js Best Practices", desc: "Community-driven guide (github.com/goldbergyoni/nodebestpractices)" },
      { name: "Express.js Docs", desc: "Official Express documentation (expressjs.com)" },
      { name: "freeCodeCamp Node.js (YouTube)", desc: "Full Node.js and Express courses" },
      { name: "Hussein Nasser (YouTube)", desc: "Deep-dive backend engineering content" },
      { name: "Node.js Design Patterns (Book)", desc: "By Mario Casciaro — advanced Node.js patterns" },
    ],
    courses: [
      { name: "Node.js, Express, MongoDB & More", provider: "Udemy (Jonas Schmedtmann)", free: false },
      { name: "Complete Node.js Developer Course", provider: "Udemy (Andrew Mead)", free: false },
      { name: "Node.js Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Server-side Development with NodeJS", provider: "HKUST (Coursera)", free: false },
    ],
    certifications: [
      { name: "OpenJS Node.js Application Developer (JSNAD)", desc: "By the OpenJS Foundation — recognized Node.js cert" },
      { name: "OpenJS Node.js Services Developer (JSNSD)", desc: "Advanced cert for Node.js services" },
      { name: "Meta Back-End Developer Certificate", desc: "Covers Node.js backend (Coursera)" },
    ],
    salaryRange: "Node.js Developer: $70,000 (entry) – $155,000+ (senior) in the US; full-stack Node roles pay top range",
    tips: [
      "Master async JavaScript before Node.js — callbacks, promises, async/await are everywhere",
      "Build a REST API with Express + MongoDB as your first project",
      "Learn Docker early — Node apps are almost always containerized in production",
      "Understand the event loop deeply — it's the most common interview topic",
    ],
  },

  sql: {
    aliases: ["sql", "database", "mysql", "postgresql", "postgres", "dbms"],
    displayName: "SQL",
    category: "Database",
    roadmap: [
      {
        phase: "Phase 1 — SQL Basics (Weeks 1-2)",
        items: [
          "Install MySQL or PostgreSQL, or use online tools like DB Fiddle",
          "Learn SELECT, FROM, WHERE, ORDER BY, LIMIT",
          "Data types and table creation (CREATE TABLE)",
          "INSERT, UPDATE, DELETE statements",
        ],
      },
      {
        phase: "Phase 2 — Querying & Joins (Weeks 2-5)",
        items: [
          "JOINs: INNER, LEFT, RIGHT, FULL OUTER",
          "GROUP BY, HAVING, and aggregate functions (COUNT, SUM, AVG)",
          "Subqueries and correlated subqueries",
          "DISTINCT, UNION, INTERSECT, EXCEPT",
          "String, date, and numeric functions",
        ],
      },
      {
        phase: "Phase 3 — Advanced SQL (Weeks 5-8)",
        items: [
          "Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)",
          "CTEs (Common Table Expressions) and recursive queries",
          "Indexes and query optimization",
          "Views, stored procedures, and triggers",
          "Transactions and ACID properties",
        ],
      },
      {
        phase: "Phase 4 — Database Design & Admin (Weeks 8+)",
        items: [
          "Normalization (1NF, 2NF, 3NF, BCNF)",
          "ER modeling and schema design",
          "Database security and user permissions",
          "Replication, backup, and recovery",
          "NoSQL comparison (MongoDB, Redis) and when to use each",
        ],
      },
    ],
    resources: [
      { name: "SQLZoo", desc: "Interactive SQL tutorials with live practice (sqlzoo.net)" },
      { name: "W3Schools SQL", desc: "Beginner-friendly tutorials with online editor (w3schools.com/sql)" },
      { name: "Mode SQL Tutorial", desc: "Analytics-focused SQL guide (mode.com/sql-tutorial)" },
      { name: "LeetCode Database", desc: "SQL practice problems for interviews (leetcode.com)" },
      { name: "SQLBolt", desc: "Interactive, gamified SQL lessons (sqlbolt.com)" },
      { name: "PostgreSQL Tutorial", desc: "Comprehensive Postgres tutorials (postgresqltutorial.com)" },
    ],
    courses: [
      { name: "The Complete SQL Bootcamp", provider: "Udemy", free: false },
      { name: "SQL for Data Science", provider: "UC Davis (Coursera)", free: false },
      { name: "SQL & Database Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Databases and SQL for Data Science", provider: "IBM (Coursera)", free: false },
    ],
    certifications: [
      { name: "Oracle Database SQL Certified Associate", desc: "Validates SQL and Oracle DB skills" },
      { name: "Microsoft Certified: Azure Data Fundamentals", desc: "Covers SQL and cloud databases" },
      { name: "PostgreSQL Associate Certification", desc: "By EDB — validates PostgreSQL expertise" },
    ],
    salaryRange: "Database/SQL Developer: $65,000 (entry) – $140,000+ (senior) in the US; DBAs and data engineers earn more",
    tips: [
      "Practice JOINs and window functions — they appear in every SQL interview",
      "Use LeetCode's Database section to practice interview-style SQL questions",
      "Learn one RDBMS deeply (PostgreSQL recommended) — concepts transfer to all",
      "Understand query execution plans to write efficient SQL",
    ],
  },

  data_science: {
    aliases: ["data science", "data scientist", "data analytics", "data analysis", "data analyst"],
    displayName: "Data Science",
    category: "Data & AI",
    roadmap: [
      {
        phase: "Phase 1 — Foundations (Weeks 1-4)",
        items: [
          "Python programming (or R) — the #1 data science language",
          "Math: statistics, probability, linear algebra basics",
          "Jupyter Notebook and Anaconda setup",
          "Excel for quick data analysis",
        ],
      },
      {
        phase: "Phase 2 — Data Manipulation (Weeks 4-8)",
        items: [
          "NumPy: arrays, vectorized operations, broadcasting",
          "Pandas: DataFrames, data cleaning, groupby, merging",
          "Matplotlib & Seaborn: data visualization",
          "SQL for querying databases",
          "Exploratory Data Analysis (EDA) techniques",
        ],
      },
      {
        phase: "Phase 3 — Machine Learning (Weeks 8-16)",
        items: [
          "Scikit-learn: regression, classification, clustering",
          "Feature engineering and selection",
          "Model evaluation: cross-validation, metrics (accuracy, F1, ROC-AUC)",
          "Supervised vs unsupervised learning",
          "Intro to deep learning with TensorFlow or PyTorch",
        ],
      },
      {
        phase: "Phase 4 — Specialization (Weeks 16+)",
        items: [
          "NLP with Hugging Face transformers",
          "Computer vision with CNNs",
          "Big Data: Spark, Hadoop, Airflow",
          "MLOps: model deployment with Docker, MLflow, FastAPI",
          "Build a portfolio of 3-5 end-to-end data projects",
        ],
      },
    ],
    resources: [
      { name: "Kaggle", desc: "Datasets, competitions, and free notebooks (kaggle.com)" },
      { name: "Towards Data Science (Medium)", desc: "Practical data science articles (towardsdatascience.com)" },
      { name: "StatQuest (YouTube)", desc: "Clear statistics and ML concept explanations" },
      { name: "Kenny Ng (YouTube)", desc: "Data science project walkthroughs" },
      { name: "DataCamp", desc: "Interactive data science courses (datacamp.com)" },
      { name: "Python Data Science Handbook (Book)", desc: "Free online by Jake VanderPlas" },
    ],
    courses: [
      { name: "Machine Learning Specialization", provider: "Andrew Ng / Stanford (Coursera)", free: false },
      { name: "Google Data Analytics Professional Certificate", provider: "Google (Coursera)", free: false },
      { name: "IBM Data Science Professional Certificate", provider: "IBM (Coursera)", free: false },
      { name: "Data Science Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Deep Learning Specialization", provider: "Andrew Ng (Coursera)", free: false },
    ],
    certifications: [
      { name: "Google Data Analytics Certificate", desc: "Beginner-friendly, recognized by employers (Coursera)" },
      { name: "IBM Data Science Professional Certificate", desc: "Covers Python, SQL, ML (Coursera)" },
      { name: "TensorFlow Developer Certificate", desc: "Validates ML/deep learning skills with TensorFlow" },
      { name: "Microsoft Certified: Azure Data Scientist Associate", desc: "Cloud-based data science cert" },
    ],
    salaryRange: "Data Scientist: $80,000 (entry) – $210,000+ (senior) in the US; one of the highest-paying tech roles",
    tips: [
      "Python + SQL + Statistics are the non-negotiable foundation — master these first",
      "Build real projects on Kaggle datasets and publish notebooks there",
      "Create a portfolio website showcasing 3-5 end-to-end projects",
      "Kaggle competitions are the best way to gain practical ML experience",
    ],
  },

  webdev: {
    aliases: ["web development", "web dev", "web developer", "full stack", "fullstack", "full-stack", "frontend", "front-end", "backend", "back-end"],
    displayName: "Web Development",
    category: "Software Engineering",
    roadmap: [
      {
        phase: "Phase 1 — Frontend Basics (Weeks 1-4)",
        items: [
          "HTML5: semantic tags, forms, accessibility",
          "CSS3: flexbox, grid, responsive design, media queries",
          "JavaScript: ES6+, DOM manipulation, events, fetch API",
          "Build static web pages and practice layouts",
        ],
      },
      {
        phase: "Phase 2 — Frontend Framework (Weeks 4-10)",
        items: [
          "Pick React (recommended), Vue, or Angular",
          "Components, props, state, hooks/lifecycle",
          "Routing (React Router / Vue Router)",
          "State management (Context, Redux, Pinia)",
          "Build interactive single-page applications",
        ],
      },
      {
        phase: "Phase 3 — Backend & Database (Weeks 10-18)",
        items: [
          "Node.js with Express (or Python with Django/FastAPI)",
          "RESTful API design and CRUD operations",
          "Database: PostgreSQL or MongoDB",
          "Authentication: JWT, sessions, OAuth",
          "Connect frontend to backend APIs",
        ],
      },
      {
        phase: "Phase 4 — Full-Stack & Deployment (Weeks 18+)",
        items: [
          "Next.js or Nuxt for SSR/SSG full-stack apps",
          "TypeScript for type safety",
          "Docker for containerization",
          "Deploy: Vercel, Netlify, AWS, or Railway",
          "Testing: Jest, React Testing Library, Cypress",
          "CI/CD with GitHub Actions",
        ],
      },
    ],
    resources: [
      { name: "The Odin Project", desc: "Free full-stack curriculum with projects (theodinproject.com)" },
      { name: "freeCodeCamp", desc: "Free certifications for responsive web, JS, and full stack (freecodecamp.org)" },
      { name: "MDN Web Docs", desc: "The reference for HTML, CSS, JS (developer.mozilla.org)" },
      { name: "roadmap.sh", desc: "Visual roadmaps for frontend, backend, and full stack (roadmap.sh)" },
      { name: "Traversy Media (YouTube)", desc: "Crash courses and project-based tutorials" },
      { name: "Full Stack Open", desc: "Free full-stack course by University of Helsinki (fullstackopen.com)" },
    ],
    courses: [
      { name: "The Web Developer Bootcamp", provider: "Udemy (Colt Steele)", free: false },
      { name: "Meta Front-End Developer Certificate", provider: "Coursera", free: false },
      { name: "Full Stack Open", provider: "University of Helsinki", free: true },
      { name: "Responsive Web Design Certification", provider: "freeCodeCamp", free: true },
      { name: "The Complete 2024 Web Development Bootcamp", provider: "Udemy (Angela Yu)", free: false },
    ],
    certifications: [
      { name: "Meta Front-End Developer Certificate", desc: "Covers React, HTML, CSS, JS (Coursera)" },
      { name: "Meta Back-End Developer Certificate", desc: "Covers Node.js, APIs, databases (Coursera)" },
      { name: "freeCodeCamp Certifications", desc: "Free: Responsive Web, JS Algorithms, Front End Libraries" },
      { name: "W3Schools Front End Certificate", desc: "HTML, CSS, JS exam-based cert" },
    ],
    salaryRange: "Web Developer: $55,000 (entry) – $140,000+ (senior) in the US; full-stack roles pay $80k-$160k+",
    tips: [
      "Start with HTML/CSS/JS before any framework — fundamentals matter most",
      "Build projects from day one: portfolio, blog, e-commerce, social app",
      "The Odin Project and freeCodeCamp are the best free starting points",
      "Deploy every project — use Vercel or Netlify for free hosting",
    ],
  },

  aws: {
    aliases: ["aws", "amazon web services", "amazon cloud"],
    displayName: "AWS",
    category: "Cloud Computing",
    roadmap: [
      {
        phase: "Phase 1 — Cloud Fundamentals (Weeks 1-3)",
        items: [
          "Understand cloud computing concepts: IaaS, PaaS, SaaS",
          "Create an AWS Free Tier account",
          "Learn core services: EC2 (compute), S3 (storage), VPC (networking)",
          "Understand regions, availability zones, and IAM",
        ],
      },
      {
        phase: "Phase 2 — Core AWS Services (Weeks 3-8)",
        items: [
          "Compute: EC2, Lambda, ECS, EKS",
          "Storage: S3, EBS, EFS, Glacier",
          "Database: RDS, DynamoDB, ElastiCache",
          "Networking: VPC, Route 53, CloudFront, ELB",
          "Security: IAM, KMS, Security Groups, NACLs",
        ],
      },
      {
        phase: "Phase 3 — Architecture & Best Practices (Weeks 8-14)",
        items: [
          "Well-Architected Framework: reliability, security, cost optimization",
          "Auto Scaling and high availability",
          "Infrastructure as Code: CloudFormation or Terraform",
          "Monitoring: CloudWatch, CloudTrail",
          "CI/CD: CodePipeline, CodeBuild, CodeDeploy",
        ],
      },
      {
        phase: "Phase 4 — Advanced & Specialization (Weeks 14+)",
        items: [
          "Serverless: Lambda, API Gateway, Step Functions, EventBridge",
          "Data: Athena, Redshift, Glue, Kinesis",
          "Machine Learning: SageMaker",
          "Multi-account strategy with AWS Organizations",
          "Get certified (Solutions Architect → Professional)",
        ],
      },
    ],
    resources: [
      { name: "AWS Official Documentation", desc: "Comprehensive service guides (docs.aws.amazon.com)" },
      { name: "AWS Skill Builder", desc: "Free official training courses (explore.skillbuilder.aws)" },
      { name: "AWS Well-Architected Tool", desc: "Best practices framework (aws.amazon.com/architecture/well-architected)" },
      { name: "Last Week in AWS (YouTube/Blog)", desc: "Practical AWS insights by Corey Quinn" },
      { name: "Be A Better Dev (YouTube)", desc: "Hands-on AWS tutorials and certification guides" },
      { name: "AWS in Plain English", desc: "Friendly explanations of AWS services (expeditedssl.com/aws-in-plain-english)" },
    ],
    courses: [
      { name: "AWS Certified Solutions Architect Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Ultimate AWS Certified Solutions Architect", provider: "Udemy (Stephane Maarek)", free: false },
      { name: "AWS Cloud Practitioner Essentials", provider: "AWS Skill Builder", free: true },
      { name: "AWS Fundamentals Specialization", provider: "Coursera", free: false },
    ],
    certifications: [
      { name: "AWS Cloud Practitioner (CLF-C02)", desc: "Entry-level — no experience required, best starting point" },
      { name: "AWS Solutions Architect Associate (SAA-C03)", desc: "Most popular AWS cert — validates architecture skills" },
      { name: "AWS Developer Associate (DVA-C02)", desc: "For developers building on AWS" },
      { name: "AWS Solutions Architect Professional (SAP-C02)", desc: "Advanced — for senior cloud architects" },
      { name: "AWS DevOps Engineer Professional", desc: "For CI/CD and automation on AWS" },
    ],
    salaryRange: "AWS Engineer: $90,000 (entry) – $180,000+ (senior) in the US; cloud architects earn $150k-$200k+",
    tips: [
      "Start with the Cloud Practitioner cert — it's the easiest entry point",
      "Use AWS Free Tier heavily — hands-on is the only way to learn cloud",
      "Build a serverless API with Lambda + API Gateway + DynamoDB as a first project",
      "Learn Terraform alongside AWS — IaC is essential for cloud roles",
    ],
  },

  machine_learning: {
    aliases: ["machine learning", "ml", "ai", "artificial intelligence", "deep learning", "neural network"],
    displayName: "Machine Learning / AI",
    category: "Data & AI",
    roadmap: [
      {
        phase: "Phase 1 — Math & Python Foundations (Weeks 1-5)",
        items: [
          "Python: NumPy, Pandas, Matplotlib",
          "Linear algebra: vectors, matrices, eigenvalues",
          "Calculus: derivatives, gradients, chain rule",
          "Probability & statistics: distributions, Bayes theorem, hypothesis testing",
        ],
      },
      {
        phase: "Phase 2 — Classical ML (Weeks 5-12)",
        items: [
          "Supervised learning: linear/logistic regression, decision trees, random forests",
          "Unsupervised learning: K-means, hierarchical clustering, PCA",
          "Scikit-learn: model training, evaluation, pipelines",
          "Feature engineering and data preprocessing",
          "Model evaluation: train/test split, cross-validation, metrics",
        ],
      },
      {
        phase: "Phase 3 — Deep Learning (Weeks 12-20)",
        items: [
          "Neural networks fundamentals: forward/backward propagation",
          "TensorFlow or PyTorch (pick one to start)",
          "CNNs for computer vision",
          "RNNs/LSTMs for sequence data",
          "Transfer learning and pre-trained models",
        ],
      },
      {
        phase: "Phase 4 — Specialization & MLOps (Weeks 20+)",
        items: [
          "NLP: transformers, BERT, GPT, Hugging Face",
          "Computer vision: object detection, segmentation",
          "MLOps: model deployment, MLflow, Docker, FastAPI",
          "Kaggle competitions for practical experience",
          "Build a portfolio of 3-5 ML projects with deployed demos",
        ],
      },
    ],
    resources: [
      { name: "Kaggle", desc: "Competitions, datasets, and notebooks — the ML playground (kaggle.com)" },
      { name: "Papers With Code", desc: "ML papers with code implementations (paperswithcode.com)" },
      { name: "Hugging Face", desc: "Pre-trained models and NLP tools (huggingface.co)" },
      { name: "3Blue1Brown (YouTube)", desc: "Visual math and neural network explanations" },
      { name: "StatQuest (YouTube)", desc: "Statistics and ML concepts made simple" },
      { name: "Andrej Karpathy (YouTube)", desc: "Deep learning from first principles" },
    ],
    courses: [
      { name: "Machine Learning Specialization", provider: "Andrew Ng / Stanford (Coursera)", free: false },
      { name: "Deep Learning Specialization", provider: "Andrew Ng (Coursera)", free: false },
      { name: "Practical Deep Learning for Coders", provider: "fast.ai", free: true },
      { name: "CS231n: Convolutional Neural Networks", provider: "Stanford (YouTube)", free: true },
      { name: "PyTorch for Deep Learning", provider: "freeCodeCamp (YouTube)", free: true },
    ],
    certifications: [
      { name: "TensorFlow Developer Certificate", desc: "Validates practical TensorFlow and deep learning skills" },
      { name: "Microsoft Certified: Azure AI Engineer Associate", desc: "AI engineering on Azure" },
      { name: "AWS Machine Learning Specialty", desc: "Advanced ML on AWS" },
      { name: "Google Professional ML Engineer", desc: "ML engineering on Google Cloud" },
    ],
    salaryRange: "ML Engineer: $100,000 (entry) – $230,000+ (senior) in the US; one of the highest-paying tech careers",
    tips: [
      "Math foundations are non-negotiable — don't skip linear algebra and statistics",
      "Start with Andrew Ng's ML course — it's the universal starting point",
      "Compete on Kaggle — it's the best way to build real ML skills and a portfolio",
      "Deploy your models — a deployed ML demo beats a Jupyter notebook on a resume",
    ],
  },

  flutter: {
    aliases: ["flutter", "dart", "flutter app", "mobile app"],
    displayName: "Flutter",
    category: "Mobile Development",
    roadmap: [
      {
        phase: "Phase 1 — Dart Basics (Weeks 1-3)",
        items: [
          "Install Flutter SDK and set up an editor (VS Code or Android Studio)",
          "Learn Dart: variables, data types, control flow, functions",
          "OOP in Dart: classes, inheritance, mixins",
          "Async programming: futures, streams, async/await",
        ],
      },
      {
        phase: "Phase 2 — Flutter Core (Weeks 3-7)",
        items: [
          "Widgets: StatelessWidget vs StatefulWidget",
          "Layout: Column, Row, Container, Stack, ListView, GridView",
          "Navigation: Navigator, routes, named routes",
          "Forms, text input, and form validation",
          "Handling gestures and animations",
        ],
      },
      {
        phase: "Phase 3 — State Management & APIs (Weeks 7-12)",
        items: [
          "State management: Provider, Riverpod, or Bloc",
          "HTTP networking with the http package and Dio",
          "JSON parsing and model classes",
          "Local storage: SharedPreferences, Hive, or SQLite (sqflite)",
          "Image and file handling",
        ],
      },
      {
        phase: "Phase 4 — Advanced Flutter (Weeks 12+)",
        items: [
          "Firebase integration: Auth, Firestore, Cloud Functions, Push Notifications",
          "Flutter for web and desktop",
          "Testing: unit, widget, and integration tests",
          "App store deployment (Play Store & App Store)",
          "Performance optimization and DevTools",
        ],
      },
    ],
    resources: [
      { name: "Flutter Official Docs", desc: "Comprehensive guides and API reference (docs.flutter.dev)" },
      { name: "Dart Language Tour", desc: "Official Dart language guide (dart.dev/language)" },
      { name: "Flutter Gems", desc: "Curated list of best Flutter packages (fluttergems.dev)" },
      { name: "Reso Coder (YouTube)", desc: "Flutter architecture and state management tutorials" },
      { name: "Marcus Ng (YouTube)", desc: "Flutter UI and app build tutorials" },
      { name: "freeCodeCamp Flutter (YouTube)", desc: "Full Flutter courses for beginners" },
    ],
    courses: [
      { name: "Flutter & Dart - The Complete Guide", provider: "Udemy (Maximilian)", free: false },
      { name: "Build Native Apps with Flutter", provider: "Google (Udacity)", free: true },
      { name: "Flutter Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Flutter App Development", provider: "App Brewery (Coursera)", free: false },
    ],
    certifications: [
      { name: "Associate Flutter Developer (AFD)", desc: "By Flutter Authority — entry-level Flutter cert" },
      { name: "Google Associate Android Developer", desc: "Covers mobile dev fundamentals (Kotlin/Android)" },
    ],
    salaryRange: "Flutter Developer: $60,000 (entry) – $140,000+ (senior) in the US; cross-platform skills are in demand",
    tips: [
      "Learn Dart before Flutter — it's a different language from JavaScript",
      "Master widget composition and state management — it's the core of Flutter",
      "Build a portfolio app: a weather app, to-do app, or e-commerce UI",
      "Firebase + Flutter is the most common stack — learn them together",
    ],
  },

  devops: {
    aliases: ["devops", "dev ops", "ci/cd", "kubernetes", "docker", "terraform"],
    displayName: "DevOps",
    category: "DevOps & Infrastructure",
    roadmap: [
      {
        phase: "Phase 1 — Linux & Networking (Weeks 1-4)",
        items: [
          "Linux fundamentals: file system, permissions, bash scripting",
          "Networking: TCP/IP, DNS, HTTP, load balancing",
          "Git: branching, merging, rebasing, pull requests",
          "Understand the software development lifecycle",
        ],
      },
      {
        phase: "Phase 2 — Containers & CI/CD (Weeks 4-10)",
        items: [
          "Docker: Dockerfile, images, containers, volumes, networks",
          "Docker Compose for multi-container apps",
          "CI/CD: GitHub Actions, GitLab CI, or Jenkins",
          "Build pipelines: build, test, deploy automation",
          "Artifact management and registry",
        ],
      },
      {
        phase: "Phase 3 — Infrastructure as Code & Cloud (Weeks 10-18)",
        items: [
          "Terraform: provisioning cloud resources declaratively",
          "AWS or Azure: core services for infrastructure",
          "Ansible: configuration management",
          "Kubernetes: pods, deployments, services, ingress",
          "Helm for Kubernetes package management",
        ],
      },
      {
        phase: "Phase 4 — Monitoring & SRE (Weeks 18+)",
        items: [
          "Monitoring: Prometheus, Grafana, ELK stack",
          "Logging: centralized logging with Loki or ELK",
          "Observability and alerting",
          "Security: DevSecOps, secrets management (Vault)",
          "Service mesh: Istio or Linkerd",
        ],
      },
    ],
    resources: [
      { name: "Kubernetes Official Docs", desc: "Complete K8s reference (kubernetes.io/docs)" },
      { name: "Docker Docs", desc: "Official Docker documentation (docs.docker.com)" },
      { name: "Terraform Learn", desc: "HashiCorp's Terraform tutorials (developer.hashicorp.com/terraform)" },
      { name: "TechWorld with Nana (YouTube)", desc: "Best DevOps YouTube channel — clear and comprehensive" },
      { name: "Bret Fisher (YouTube)", desc: "Docker and Docker Compose tutorials" },
      { name: "The DevOps Roadmap", desc: "Visual roadmap for DevOps (roadmap.sh/devops)" },
    ],
    courses: [
      { name: "Docker & Kubernetes: The Practical Guide", provider: "Udemy (Maximilian)", free: false },
      { name: "DevOps Engineering Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Certified Kubernetes Administrator (CKA) Course", provider: "Udemy", free: false },
      { name: "HashiCorp Terraform Associate", provider: "HashiCorp", free: true },
    ],
    certifications: [
      { name: "Certified Kubernetes Administrator (CKA)", desc: "By CNCF — most respected K8s cert" },
      { name: "AWS Certified DevOps Engineer Professional", desc: "Advanced AWS DevOps certification" },
      { name: "HashiCorp Terraform Associate", desc: "Validates IaC skills with Terraform" },
      { name: "Docker Certified Associate (DCA)", desc: "Validates Docker and containerization skills" },
      { name: "Azure DevOps Engineer Expert", desc: "Microsoft's DevOps certification" },
    ],
    salaryRange: "DevOps Engineer: $90,000 (entry) – $180,000+ (senior) in the US; SRE roles pay $120k-$200k+",
    tips: [
      "Learn Linux and Docker first — they're the foundation of everything DevOps",
      "Set up a CI/CD pipeline for a personal project on GitHub Actions (it's free)",
      "Kubernetes is the most in-demand skill — get the CKA cert for maximum impact",
      "Build a homelab: run Docker, K8s, and monitoring tools on a VM or Raspberry Pi",
    ],
  },

  golang: {
    aliases: ["go", "golang", "go language", "go lang"],
    displayName: "Go (Golang)",
    category: "Programming Language",
    roadmap: [
      {
        phase: "Phase 1 — Go Basics (Weeks 1-3)",
        items: [
          "Install Go and set up VS Code with the Go extension",
          "Syntax: variables, constants, data types, operators",
          "Control flow: if, for (Go only has 'for'), switch",
          "Functions, multiple return values, named returns",
        ],
      },
      {
        phase: "Phase 2 — Go Core Concepts (Weeks 3-7)",
        items: [
          "Structs and methods",
          "Interfaces — Go's approach to polymorphism",
          "Pointers in Go (simpler than C/C++)",
          "Error handling (Go's error pattern, no exceptions)",
          "Packages and modules (go mod)",
        ],
      },
      {
        phase: "Phase 3 — Concurrency (Weeks 7-11)",
        items: [
          "Goroutines — lightweight threads",
          "Channels: buffered and unbuffered",
          "Select statement for multiplexing channels",
          "sync package: WaitGroup, Mutex, Once",
          "Concurrency patterns: worker pool, fan-in/fan-out, pipeline",
        ],
      },
      {
        phase: "Phase 4 — Go Ecosystem (Weeks 11+)",
        items: [
          "Building REST APIs with net/http or Gin/Echo/Fiber",
          "Database access with database/sql or GORM",
          "gRPC and Protocol Buffers",
          "Testing: testing package, table-driven tests, benchmarks",
          "Deployment: Go binaries are single-file — perfect for containers",
        ],
      },
    ],
    resources: [
      { name: "A Tour of Go", desc: "Official interactive Go tutorial (go.dev/tour)" },
      { name: "Go by Example", desc: "Practical examples for every Go feature (gobyexample.com)" },
      { name: "Go Official Docs", desc: "Complete language and stdlib reference (go.dev/doc)" },
      { name: "Effective Go", desc: "Official guide to writing idiomatic Go (go.dev/doc/effective_go)" },
      { name: "Go Time (Podcast)", desc: "Weekly podcast on the Go ecosystem (changelog.com/gotime)" },
      { name: "freeCodeCamp Go (YouTube)", desc: "Full Go course for beginners" },
    ],
    courses: [
      { name: "Go: The Complete Developer's Guide", provider: "Udemy (Stephen Grider)", free: false },
      { name: "Learning Go Programming", provider: "O'Reilly", free: false },
      { name: "Go Full Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "Server-side Development with Go", provider: "Coursera", free: false },
    ],
    certifications: [
      { name: "No official Go certification", desc: "Go has no official cert — portfolio and projects matter most" },
    ],
    salaryRange: "Go Developer: $90,000 (entry) – $180,000+ (senior) in the US; high demand in backend and cloud-native roles",
    tips: [
      "Go is built for concurrency — master goroutines and channels",
      "Build a REST API or a CLI tool as your first Go project",
      "Go is used heavily in cloud-native: Kubernetes, Docker, Terraform are all written in Go",
      "Read the Go standard library source — it's the best example of idiomatic Go",
    ],
  },

  rust: {
    aliases: ["rust", "rustlang", "rust lang"],
    displayName: "Rust",
    category: "Programming Language",
    roadmap: [
      {
        phase: "Phase 1 — Rust Basics (Weeks 1-3)",
        items: [
          "Install Rust with rustup and set up an IDE (rust-analyzer in VS Code)",
          "Syntax: variables (mut/immut), data types, control flow",
          "Functions and expressions (Rust is expression-oriented)",
          "Strings: String vs &str (heap vs slice)",
        ],
      },
      {
        phase: "Phase 2 — Ownership & Borrowing (Weeks 3-8)",
        items: [
          "Ownership rules — Rust's unique feature",
          "References and borrowing (& and &mut)",
          "Lifetimes — explicit lifetime annotations",
          "Slices and how they relate to lifetimes",
          "Clone vs Copy vs Move semantics",
        ],
      },
      {
        phase: "Phase 3 — Structs, Enums, & Traits (Weeks 8-13)",
        items: [
          "Structs and impl blocks",
          "Enums and pattern matching (match, if let, while let)",
          "Traits — Rust's interface equivalent",
          "Trait bounds and generics",
          "Error handling with Result and Option (no exceptions)",
        ],
      },
      {
        phase: "Phase 4 — Advanced Rust & Ecosystem (Weeks 13+)",
        items: [
          "Smart pointers: Box, Rc, Arc, RefCell",
          "Concurrency: threads, channels, Send/Sync traits",
          "Async programming with tokio or async-std",
          "Web frameworks: Axum, Actix, or Rocket",
          "Testing and documentation (cargo test, cargo doc)",
        ],
      },
    ],
    resources: [
      { name: "The Rust Book", desc: "Official, free, comprehensive — the best starting point (doc.rust-lang.org/book)" },
      { name: "Rust by Example", desc: "Code-driven examples for every concept (doc.rust-lang.org/rust-by-example)" },
      { name: "Rustlings", desc: "Interactive exercises to learn Rust by doing (github.com/rust-lang/rustlings)" },
      { name: "Let's Get Rusty (YouTube)", desc: "Clear Rust tutorials and project builds" },
      { name: "Jon Gjengset (YouTube)", desc: "Advanced Rust deep dives for experienced devs" },
      { name: "This Week in Rust", desc: "Weekly newsletter with new content and updates (this-week-in-rust.org)" },
    ],
    courses: [
      { name: "Rust Programming Course", provider: "freeCodeCamp (YouTube)", free: true },
      { name: "The Rust Programming Language", provider: "Udemy", free: false },
      { name: "Rust for C/C++ Developers", provider: "Linux Foundation (edX)", free: true },
    ],
    certifications: [
      { name: "No official Rust certification", desc: "Rust has no official cert — projects and contributions matter most" },
    ],
    salaryRange: "Rust Developer: $100,000 (entry) – $200,000+ (senior) in the US; one of the highest-paying languages",
    tips: [
      "Ownership and borrowing are the hardest part — push through it, it clicks eventually",
      "Do Rustlings exercises alongside reading The Rust Book",
      "Build a CLI tool, a web server, or a parser as your first project",
      "Rust is used in systems, WebAssembly, blockchain, and high-performance backends",
    ],
  },
};

// ─── Intent Detection ───────────────────────────────────────────────────────

type Intent = "greeting" | "thanks" | "roadmap" | "courses" | "resume" | "salary" | "certifications" | "resources" | "general";

function detectIntent(q: string): Intent {
  const lower = q.toLowerCase().trim();
  const words = lower.split(/\s+/);

  // Greetings: "hi", "hello", "hey", "hi there", "good morning", etc.
  const greetings = ["hi", "hello", "hey", "hii", "hiii", "yo", "sup", "greetings", "good morning", "good afternoon", "good evening", "howdy", "hiya", "hola"];
  if (words.length <= 3 && greetings.some((g) => words.includes(g) || lower === g || lower.startsWith(g + " ") || lower.startsWith(g + ",") || lower.startsWith(g + "!"))) return "greeting";

  // Thanks
  if (/^(thanks|thank you|thx|ty|appreciate it|great|awesome|nice|cool|perfect|got it|that helps|helpful)/.test(lower) && words.length <= 5) return "thanks";

  if (lower.includes("resume") || lower.includes("cv")) return "resume";
  if (/\b(salary|earn|income|pay)\b/.test(lower)) return "salary";
  if (lower.includes("certif") || lower.includes("certificate")) return "certifications";
  if (lower.includes("resource") || lower.includes("book") || lower.includes("youtube") || lower.includes("website") || lower.includes("platform") || lower.includes("where to learn") || lower.includes("where can i learn")) return "resources";
  if (lower.includes("roadmap") || lower.includes("learning path") || lower.includes("career path") || lower.includes("how to learn") || lower.includes("where to start") || lower.includes("step by step") || lower.includes("steps to learn") || lower.includes("guide to learn")) return "roadmap";
  if (lower.includes("course") || (lower.includes("best") && (lower.includes("learn") || lower.includes("study")))) return "courses";
  if (lower.includes("learn") || lower.includes("study") || lower.includes("start") || lower.includes("begin")) return "roadmap";
  return "general";
}

function detectTech(q: string): string | null {
  const lower = " " + q.toLowerCase() + " ";
  // Check each tech's aliases against the query
  for (const [key, info] of Object.entries(TECH_DB)) {
    for (const alias of info.aliases) {
      // Word-boundary match to avoid false positives (e.g. "c" matching inside "css")
      const pattern = new RegExp(`(^|[^a-z+#.])${escapeRegex(alias)}([^a-z+#.]|$)`, "i");
      if (pattern.test(lower)) {
        return key;
      }
    }
  }
  return null;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ─── Response Generators ────────────────────────────────────────────────────

function generateResponse(messages: ChatTurn[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const query = lastUser?.content ?? "";
  const intent = detectIntent(query);
  const techKey = detectTech(query);

  if (intent === "greeting") return greetingResponse();
  if (intent === "thanks") return thanksResponse();

  if (intent === "resume") {
    return resumeResponse();
  }

  if (techKey) {
    const tech = TECH_DB[techKey];
    switch (intent) {
      case "roadmap":
        return techRoadmapResponse(tech);
      case "courses":
        return techCoursesResponse(tech);
      case "salary":
        return techSalaryResponse(tech);
      case "certifications":
        return techCertificationsResponse(tech);
      case "resources":
        return techResourcesResponse(tech);
      default:
        return techOverviewResponse(tech);
    }
  }

  // No specific tech detected
  if (intent === "salary") return generalSalaryResponse();
  if (intent === "certifications") return generalCertificationResponse();
  if (intent === "resources") return generalResourceResponse();
  return defaultResponse(query);
}

function techRoadmapResponse(tech: TechInfo): string {
  let out = `Here's a step-by-step roadmap to learn **${tech.displayName}**:\n\n`;
  for (const phase of tech.roadmap) {
    out += `**${phase.phase}**\n`;
    for (const item of phase.items) {
      out += `- ${item}\n`;
    }
    out += "\n";
  }
  out += `**Pro Tips for ${tech.displayName}**\n`;
  for (const tip of tech.tips) {
    out += `- ${tip}\n`;
  }
  out += `\nWould you like me to recommend specific courses, certifications, or learning resources for ${tech.displayName}?`;
  return out;
}

function techCoursesResponse(tech: TechInfo): string {
  let out = `Here are the best courses to learn **${tech.displayName}**:\n\n`;
  out += `**Free Courses**\n`;
  for (const c of tech.courses.filter((c) => c.free)) {
    out += `- **${c.name}** — ${c.provider}\n`;
  }
  out += `\n**Paid Courses (High Value)**\n`;
  for (const c of tech.courses.filter((c) => !c.free)) {
    out += `- **${c.name}** — ${c.provider}\n`;
  }
  out += `\n**Tips for Choosing**\n`;
  out += `- Pick one course and finish it before moving on\n`;
  out += `- Prioritize project-based courses over pure video lectures\n`;
  out += `- Check the last updated date — tech courses age fast\n`;
  out += `- Read recent reviews, not just the star rating\n\n`;
  out += `Would you like the full learning roadmap for ${tech.displayName} as well?`;
  return out;
}

function techResourcesResponse(tech: TechInfo): string {
  let out = `Here are the best learning resources for **${tech.displayName}**:\n\n`;
  out += `**Websites & Documentation**\n`;
  for (const r of tech.resources) {
    out += `- **${r.name}** — ${r.desc}\n`;
  }
  out += `\n**Pro Tips**\n`;
  for (const tip of tech.tips) {
    out += `- ${tip}\n`;
  }
  out += `\nWould you like me to recommend courses or a step-by-step roadmap for ${tech.displayName}?`;
  return out;
}

function techCertificationsResponse(tech: TechInfo): string {
  let out = `Here are the best certifications for **${tech.displayName}**:\n\n`;
  if (tech.certifications.length === 0 || tech.certifications[0].name.includes("No official")) {
    out += `${tech.certifications[0]?.desc ?? "There is no official certification for this technology yet."}\n\n`;
    out += `Instead, focus on:\n`;
    out += `- Building a strong portfolio of real projects\n`;
    out += `- Contributing to open-source ${tech.displayName} projects\n`;
    out += `- Getting hands-on experience that speaks louder than a cert\n\n`;
  } else {
    for (const cert of tech.certifications) {
      out += `- **${cert.name}** — ${cert.desc}\n`;
    }
    out += `\n**How to Choose**\n`;
    out += `- Align certs with your target role — don't collect them randomly\n`;
    out += `- Check employer demand on job boards before investing\n`;
    out += `- Weigh cost and time vs. career impact\n\n`;
  }
  out += `Would you like the learning roadmap or course recommendations for ${tech.displayName}?`;
  return out;
}

function techSalaryResponse(tech: TechInfo): string {
  let out = `**${tech.displayName} Salary Overview**\n\n`;
  out += `${tech.salaryRange}\n\n`;
  out += `**Factors That Affect Salary**\n`;
  out += `- **Location** — Tech hubs (SF, NYC, Seattle) pay 20-40% more; remote roles vary\n`;
  out += `- **Experience** — Senior roles can pay 2-3x entry-level\n`;
  out += `- **Company size** — Big tech pays top of range; startups offer equity\n`;
  out += `- **Specialization** — Niche skills within ${tech.displayName} command premiums\n`;
  out += `- **Negotiation** — Always negotiate; initial offers often have 10-15% room\n\n`;
  out += `**Resources to Research**\n`;
  out += `- Levels.fyi — verified tech salaries by company and level\n`;
  out += `- Glassdoor and Payscale — broader market data\n`;
  out += `- LinkedIn Salary — role-based insights\n\n`;
  out += `Tell me your location and experience level and I can give a more specific estimate.`;
  return out;
}

function techOverviewResponse(tech: TechInfo): string {
  let out = `Great choice! **${tech.displayName}** is a ${tech.category} that's in high demand. Here's how to get started:\n\n`;
  out += `**Learning Roadmap**\n`;
  for (const phase of tech.roadmap) {
    out += `${phase.phase}\n`;
    for (const item of phase.items.slice(0, 3)) {
      out += `- ${item}\n`;
    }
    out += `- ...and more\n\n`;
  }
  out += `**Best Free Resources**\n`;
  for (const r of tech.resources.slice(0, 3)) {
    out += `- **${r.name}** — ${r.desc}\n`;
  }
  out += `\n**Top Courses**\n`;
  for (const c of tech.courses.slice(0, 3)) {
    out += `- **${c.name}** — ${c.provider} ${c.free ? "(Free)" : "(Paid)"}\n`;
  }
  out += `\n**Salary Outlook**\n${tech.salaryRange}\n\n`;
  out += `Would you like the detailed roadmap, specific course recommendations, or certification options for ${tech.displayName}?`;
  return out;
}

function resumeResponse(): string {
  return `Here's how to build a standout resume:

**Structure**
1. **Header** — Name, contact info, LinkedIn, GitHub/portfolio link
2. **Professional Summary** — 2-3 lines highlighting your focus and top skills
3. **Skills** — Grouped by category (Languages, Frameworks, Tools, Soft skills)
4. **Experience** — Reverse chronological, with measurable achievements
5. **Projects** — 2-3 relevant projects with links and brief descriptions
6. **Education** — Degree, institution, graduation year
7. **Certifications** — Relevant certs with dates

**Key Tips**
- Use action verbs: "Built", "Optimized", "Led", "Automated"
- Quantify results: "Reduced load time by 40%", "Served 10k+ users"
- Keep it to one page (two max for experienced roles)
- Tailor keywords to the job description (ATS optimization)
- Use a clean, single-column template — avoid heavy graphics
- Proofread: no typos, consistent formatting

**Common Mistakes to Avoid**
- Listing responsibilities instead of achievements
- Generic summaries that could apply to anyone
- Missing links to your work (GitHub, live projects)

Want me to review a specific section or suggest improvements to your current resume?`;
}

function generalSalaryResponse(): string {
  return `Here's a general salary overview (figures vary by location, company, and experience):

**Software Developer (US, approx.)**
- Entry-level (0-2 yrs): $70,000 – $95,000
- Mid-level (3-5 yrs): $95,000 – $140,000
- Senior (6+ yrs): $140,000 – $200,000+

**Data Scientist**
- Entry-level: $80,000 – $110,000
- Mid-level: $110,000 – $150,000
- Senior: $150,000 – $210,000+

**Frontend Developer**
- Entry-level: $65,000 – $90,000
- Mid-level: $90,000 – $130,000
- Senior: $130,000 – $180,000+

**Factors That Affect Salary**
- **Location** — Tech hubs (SF, NYC, Seattle) pay 20-40% more
- **Company size** — FAANG and big tech pay top of range
- **Specialization** — AI/ML, cloud, and security roles command premiums
- **Negotiation** — Always negotiate; initial offers often have 10-15% room

Tell me a specific technology or role (e.g., "Java developer salary" or "Python salary") and I'll give you a targeted range.`;
}

function generalCertificationResponse(): string {
  return `Here are top certifications by field:

**Cloud**
- **AWS Certified Solutions Architect** — Most recognized cloud cert
- **Google Cloud Professional Cloud Architect** — Growing demand
- **Microsoft Certified: Azure Administrator** — Enterprise roles

**Security**
- **CompTIA Security+** — Best entry-level security cert
- **CISSP** — Gold standard for security management

**Data & AI**
- **Google Data Analytics Professional Certificate** (Coursera)
- **TensorFlow Developer Certificate** — Validates ML skills

**Project Management**
- **PMP** — Globally recognized, requires experience
- **Google Project Management Certificate** (Coursera)

Tell me a specific technology (e.g., "Java certifications" or "AWS certifications") and I'll give you targeted recommendations.`;
}

function generalResourceResponse(): string {
  return `Here are the best general learning resources:

**YouTube Channels**
- **freeCodeCamp** — Full courses on nearly every tech topic
- **Traversy Media** — Practical web dev tutorials
- **Fireship** — Quick, high-energy tech overviews

**Websites & Platforms**
- **MDN Web Docs** — The reference for web technologies
- **freeCodeCamp.org** — Free, project-based curriculum
- **roadmap.sh** — Visual roadmaps for every tech career

**Books**
- *"Clean Code"* by Robert Martin — Writing better code
- *"The Pragmatic Programmer"* by Hunt & Thomas — Career wisdom
- *"Cracking the Coding Interview"* — Interview prep

Tell me a specific technology (e.g., "best resources for Python" or "Java learning websites") and I'll give you targeted recommendations.`;
}

function greetingResponse(): string {
  return `Hi there! 👋 I'm CareerCompass, your AI career guidance assistant.

I can help you with:
- Learning roadmaps for any technology
- Course recommendations
- Resume tips
- Salary insights
- Certifications
- Learning resources

What would you like to know? Feel free to ask me anything about your career!`;
}

function thanksResponse(): string {
  const replies = [
    "You're welcome! Feel free to ask if you have any more questions.",
    "Happy to help! Let me know if there's anything else you'd like to know.",
    "Anytime! I'm here whenever you need career guidance.",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

function defaultResponse(query: string): string {
  return `That's a great question! I specialize in career guidance for tech fields. Here's what I can help with:

- **Roadmaps** — Step-by-step learning paths (e.g., "I want to learn Java")
- **Courses** — Best course recommendations (e.g., "best courses for Python")
- **Resources** — Learning websites & platforms (e.g., "where to learn C")
- **Salary** — Pay ranges for roles (e.g., "salary for a React developer")
- **Certifications** — Worthwhile certs (e.g., "certifications for AWS")
- **Resume** — Tips to improve your resume

I currently cover: Java, C, C++, Python, JavaScript, React, Node.js, SQL, Go, Rust, Flutter, AWS, DevOps, Data Science, Machine Learning, and Web Development.

What topic would you like to explore?`;
}

// ─── Server ─────────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { messages } = (await req.json()) as { messages: ChatTurn[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const reply = generateResponse(messages);

    await new Promise((resolve) => setTimeout(resolve, 400));

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
