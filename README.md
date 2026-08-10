# 🤖 AI Client Notes

## Short Description

AI Client Notes is a full-stack client management application that uses AI to turn rough client session notes into structured summaries, action points and personalised follow-up messages.

The application is designed for coaches, freelancers and small business owners who want to keep client information organised while reducing the time spent writing up session notes and follow-ups.

🔗 **Live Demo:** [https://clientnotesai.vercel.app](https://clientnotesai.vercel.app)

---

## 📸 Screenshot / Demo

### Dashboard

![ClientNotesAI Dashboard](./docs/screenshots/Dashboard.png)

### Client Management

_Add screenshot here_

### AI Session Results

_Add screenshot here_

### Session History

_Add screenshot here_

🔗 **[View the Live Application](https://clientnotesai.vercel.app)**

---

## ✨ Features

### 👤 Authentication

- User authentication using Clerk
- Protected application routes
- User-specific client data
- Sign-in and sign-up functionality
- Demo user functionality for portfolio visitors

### 👥 Client Management

- Create client profiles
- Store client names, email addresses and phone numbers
- Add additional client notes
- View individual client profiles
- Delete client records
- View session history for each client

### 🤖 AI-Powered Session Processing

Users can enter rough notes from a client session and use AI to generate:

- 📝 A concise session summary
- ✅ Clear action points
- 💬 A personalised follow-up message

The AI response is returned as structured JSON so each part can be displayed separately within the application.

### 📊 Dashboard

The dashboard provides an overview of client activity, including:

- Total clients
- Total sessions
- Recent client activity
- Client and session information

### 🗂️ Session History

Each client has their own session history.

Saved sessions contain:

- Original session notes
- AI-generated summary
- AI-generated action points
- AI-generated follow-up message
- Session creation date

### 📋 Copy Follow-Up Messages

Generated follow-up messages can be copied directly from the application for use in client communications.

### 🧪 Demo Mode

A demo user allows visitors to explore the application without permanently saving changes.

This provides an easy way for employers and portfolio visitors to test the application's functionality without creating their own account.

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js App Router
- Next.js Server Actions
- Node.js

### AI

- OpenAI API
- GPT-4o-mini
- Structured JSON responses

### Authentication

- Clerk

### Database

- PostgreSQL
- Prisma ORM

### Deployment

- Vercel

---

## ⚙️ How It Works

The application combines authentication, a relational database and AI processing into a single full-stack Next.js application.

### 1. User Authentication

Users sign in through Clerk.

Protected application routes use authentication to control access to the application and ensure users can only access their own client data.

### 2. Client Creation

Authenticated users can create client profiles containing:

- Name
- Email
- Phone
- Additional notes

Each client is associated with the authenticated user.

### 3. Session Creation

A user selects a client and enters their rough session notes.

The notes are submitted through a Next.js Server Action.

### 4. AI Processing

The session notes are sent to OpenAI using the `gpt-4o-mini` model.

The application requests a structured response containing:

- A session summary
- Action points
- A personalised follow-up message

### 5. Results

The generated content is returned to the application and displayed as separate sections.

Users can review the results and copy the generated follow-up message.

### 6. Database Storage

For normal users, the original session notes and generated AI results are stored in PostgreSQL using Prisma.

The main relationships are:

**User → Client → Session**

This allows users to return to a client and view their previous sessions.

### 7. Demo Mode

The application includes a demo mode so visitors can explore the main functionality without permanently modifying the demonstration data.

---

## 🚀 Installation

### Prerequisites

Before running the project locally, you will need:

- Node.js
- npm
- PostgreSQL database
- Clerk account
- OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/SusanAlexFSD/clientnotesai.git
