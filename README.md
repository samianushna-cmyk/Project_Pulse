# 🚀 ProjectPulse

A full-stack collaborative project management and evaluation platform designed to streamline student projects, mentor reviews, leaderboard tracking, and team milestone submissions.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Build and Deployment Guide](#build-and-deployment-guide)
  - [Backend Deployment (e.g. Render / Railway)](#backend-deployment)
  - [Frontend Deployment (e.g. Vercel / Netlify)](#frontend-deployment)
- [API Health Check](#api-health-check)

---

## 🌟 Overview

ProjectPulse empowers student teams, leaders, and mentors with:
- **Role-Based Access Control**: Student, Team Leader, and Mentor/Admin roles.
- **Project Tracking & Submission**: Milestone tracking, weekly progress logs, deliverables upload, and review workflows.
- **Dynamic Leaderboard & Analytics**: Performance metrics, grading rubrics, and feedback loops.
- **Responsive UI/UX**: Sleek glassmorphism interface powered by TailwindCSS and Lucide Icons.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 18** + **Vite 6**
- **TailwindCSS** + **Lucide React**
- **Axios** (HTTP client with JWT interceptors)
- **React Router DOM v6**

### Backend (`/server`)
- **Node.js** + **Express.js (ES Modules)**
- **MongoDB Atlas** + **Mongoose**
- **JWT (JSON Web Tokens)** + **Bcrypt.js**
- **CORS** + **Dotenv**

---

## 📂 Project Structure

```plaintext
projectpulse/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static assets
│   ├── src/                    # Components, pages, context, services
│   ├── .env.example            # Client env example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Express + Node.js Backend
│   ├── config/                 # DB connection configuration
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Auth and error middleware
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express API routes
│   ├── utils/                  # Helper utilities
│   ├── .env.example            # Server env example
│   ├── package.json
│   └── server.js
├── .gitignore
└── README.md
```

---

## 🔑 Environment Variables

### Server (`server/.env`)

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/samianushna-cmyk/Project_Pulse.git
cd Project_Pulse
```

### 2. Configure Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas URI and JWT Secret
npm run dev
```

### 3. Configure Frontend
```bash
cd ../client
npm install
cp .env.example .env
npm run dev
```

The frontend will run at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## 🌐 Build and Deployment Guide

### Backend Deployment (e.g., Render)
1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure the settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: A secure random secret string
   - `CLIENT_URL`: URL of your deployed frontend (e.g. `https://projectpulse.vercel.app`)
   - `NODE_ENV`: `production`

### Frontend Deployment (e.g., Vercel)
1. Import the repository into [Vercel](https://vercel.com).
2. Configure the project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add Environment Variable:
   - `VITE_API_URL`: Your deployed backend API URL (e.g. `https://projectpulse-backend.onrender.com/api`)

---

## 💓 API Health Check

Verify backend status at:
```http
GET /api/health
```

Expected Response:
```json
{
  "message": "ProjectPulse API is running",
  "timestamp": "2026-09-24T10:00:00.000Z",
  "status": "healthy"
}
```
