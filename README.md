# 🎯 Interview Prep AI

A full-stack web application that helps candidates prepare for job interviews. Users upload their resume, describe themselves, and paste a job description; the app uses Google's Gemini AI to generate a personalized interview report — including a resume-to-job match score, likely technical and behavioral questions with model answers, identified skill gaps, and a day-by-day preparation plan.

---

## 🚀 Live Demo

🔗 https://interview-prep-ai24.vercel.app/

---

## ✨ Features

- 🧠 **AI-generated interview reports** — resume text, self-description, and job description are analyzed to produce:
  - 📊 A match score (0–100) between the candidate's profile and the job
  - 💻 Technical questions with interviewer intent and suggested answers
  - 🗣️ Behavioral questions with interviewer intent and suggested answers
  - ⚠️ Skill gaps rated by severity (low / medium / high)
  - 📅 A structured, multi-day preparation plan
- 📄 **Resume PDF generation** — generates a tailored resume PDF based on the report and job description
- 🔐 **Authentication** — JWT-based register/login/logout with a "get current user" endpoint, backed by cookie-based sessions and a token blacklist for logout
- 🕘 **Report history** — fetch all past interview reports or a single report by ID
- 📤 **File uploads** — resume PDFs are parsed server-side to extract text before being sent to the AI

---

## 🛠️ Tech Stack

**Client** 💻

- React + Vite
- Redux Toolkit for state management
- React Router for routing
- Tailwind CSS
- Axios for API requests
- Lucide React for icons

**Server** 🖥️

- Node.js + Express
- MongoDB + Mongoose
- Google Gemini API (`@google/genai`) for report and resume generation
- JWT (`jsonwebtoken`) + `bcryptjs` for auth
- `multer` for file upload handling
- `pdf-parse` for extracting text from uploaded resumes
- `puppeteer` for rendering generated resumes to PDF
- `zod` for schema validation
- `express-rate-limit` for rate limiting
- `cookie-parser` for cookie handling
- `cors` for cross-origin resource sharing

---

## 📁 Project Structure

```
Interview-Prep-AI/
├── client/frontend                # React
│   ├── src/
│   │   ├── api/                   # Axios instance + API call modules (auth, interview)
│   │   ├── app/                   # Redux store and route definitions
│   │   ├── components/
│   │   │   ├── auth/              # ProtectedRoute / GuestRoute guards
│   │   │   ├── common/            # Reusable UI: Button, Input, Card, Badge, Alert, etc.
│   │   │   ├── dashboard/         # Dashboard, ReportCard
│   │   │   ├── interview/         # Interview-specific components (e.g. FileUploader)
│   │   │   ├── layout/            # AppLayout, AuthLayout, Navbar, Sidebar, PageHeader
│   │   │   └── report/            # ReportCard, QuestionCard, SkillGapCard
│   │   ├── constants/             # Shared constants
│   │   ├── features/
│   │   │   ├── auth/              # authSlice (Redux)
│   │   │   └── interview/         # interviewSlice (Redux)
│   │   ├── pages/                 # Page components (e.g. Login, Register, Dashboard)
│   │   ├── utils/                 # Error handling and formatting helpers
│   │   ├── App.jsx
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # Entry point
│   ├── .env                       # Environment variables
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML template
│   ├── package.json               # Project config
│   ├── vercel.json                # Vercel config
│   └── vite.config.js             # Dev server proxies /api → http://localhost:3000
│
├── server/ backend                # Express backend
│   ├── src/
│   │   ├── app.js                 # Express app setup, routes, error handlers
│   │   ├── config/                # Environment variables and DB connection
│   │   ├── controllers/           # auth.controller.js, interview.controller.js
│   │   ├── middlewares/           # asyncHandler, auth, error handling, file upload
│   │   ├── models/                # User, InterviewReport, BlacklistToken (Mongoose)
│   │   ├── prompts/               # Gemini prompt builders for interview reports/resumes
│   │   ├── routes/                # /api/v1/auth, /api/v1/interview
│   │   ├── services/              # service modules (e.g. auth.service.js)
│   │   └── utils/                 # ApiError, ApiResponse helpers
│   ├── .env                       # Environment variables
│   ├── server.js                  # Entry point
│   └── package.json               # Project config
│
└── README.md                      # Project description
```

---

## 🔌 API Overview

### 🔐 Auth — `/api/v1/auth`

| Method | Endpoint    | Access     | Description              |
| ------ | ----------- | ---------- | ------------------------ |
| POST   | `/register` | 🌐 Public  | Register a new user      |
| POST   | `/login`    | 🌐 Public  | Log in a user            |
| POST   | `/logout`   | 🔒 Private | Log out the current user |
| GET    | `/get-me`   | 🔒 Private | Get the logged-in user   |

### 🧠 Interview — `/api/v1/interview`

| Method | Endpoint                     | Access     | Description                                                                            |
| ------ | ---------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| POST   | `/`                          | 🔒 Private | Generate an interview report from a resume file, self-description, and job description |
| GET    | `/report/all`                | 🔒 Private | Get all interview reports for the current user                                         |
| GET    | `/report/:interviewReportId` | 🔒 Private | Get a single interview report by ID                                                    |
| GET    | `/resume/:interviewReportId` | 🔒 Private | Generate a tailored resume PDF for a given report                                      |

🔒 Private routes require authentication via the `authUser` middleware (JWT).

---

## 🚀 Getting Started

### ✅ Prerequisites

- 🟢 [Node.js](https://nodejs.org/en/download)
- 🍃 A [MongoDB](https://www.mongodb.com/products/platform/atlas-database) instance (local or hosted)
- 🔑 A [Google Gemini](https://aistudio.google.com/api-keys) API key

### 1. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

```
PORT=5000

NODE_ENV=development

CORS_ORIGIN=your-client-url

COOKIE_SECRET=your-secret-key

MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/interview-prep

JWT_SECRET=your-strong-random-secret
JWT_EXPIRES_IN=1d

GEMINI_API_KEY=your-gemini-api-key
```

Run the server:

```bash
npm run dev      # starts with --watch for auto-reload
# or
npm run build     # runs node server.js directly
```

### 2. Frontend setup

```bash
cd client
npm install
```

The client ships with a `.env` containing:

```
# Leave VITE_API_BASE_URL empty in development to use the Vite proxy (/api → backend).
# In production, set it to your backend URL (e.g. https://api.example.com).
VITE_API_BASE_URL=
```

Run the dev server:

```bash
npm run dev
```

In development, Vite proxies requests from `/api` to `http://localhost:3000` (see `vite.config.js`), so no `VITE_API_BASE_URL` is needed locally.

---

## 📜 Scripts

**Client**

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build
- `npm run format` — format with Prettier

**Server**

- `npm run dev` — start with Node's `--watch` for auto-reload
- `npm run build` — start the server (`node server.js`)
- `npm run format` — format with Prettier

---

## ⚖️ License

This project is open source and free to use.
