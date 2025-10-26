# CrUX-App

Fullstack Application to get Chrome UX report for a given URL.

# Chrome UX Report Dashboard

> A production-grade web application for analyzing and visualizing Core Web Vitals metrics from Google's Chrome User Experience Report (CrUX) API.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The **Chrome UX Report Dashboard** is an enterprise-ready solution for monitoring website performance across multiple properties. It leverages Google's Chrome User Experience Report (CrUX) to provide real-world user experience data, aggregated metrics, and actionable insights.

### Key Problems Solved

- **Batch Analysis**: Analyze up to 10 URLs simultaneously
- **Performance Monitoring**: Track all 6 Core Web Vitals metrics (LCP, FID, CLS, FCP, TTFB, INP)
- **User Experience**: Modern glassmorphic UI with smooth interactions

---

## ✨ Features

### 🚀 Core Features

- **Multi-URL Analysis** - Batch analyze up to 10 URLs at once
- **Real-Time Validation** - Instant URL validation with helpful error messages
- **Individual URL Scores** - Performance scoring (0-100) for each URL
- **Advanced Filtering** - Filter by metric type and threshold values
- **Dynamic Sorting** - Sort by any metric in ascending or descending order
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Glassmorphic UI** - Modern, premium design with frosted glass effects
- **Toast Notifications** - Real-time feedback for all user actions
- **Error Handling** - Comprehensive error boundaries and graceful degradation

### 🎨 UI/UX Highlights

- **Single Search Bar with Chips** - Clean URL management with visual chips
- **Animated Gradient Background** - Eye-catching 5-color gradient animation
- **Hover Effects** - Smooth transitions and 3D lift effects
- **Loading States** - Clear visual feedback during API calls
- **Accessibility** - WCAG 2.1 compliant with keyboard navigation

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────┐
│           Frontend (React + TypeScript)             │
│  - Single-page application with Material-UI         │
│  - Client-side routing and state management         │
│  - Smart caching and data visualization             │
└────────────────────┬────────────────────────────────┘
                     │ REST API (HTTP/HTTPS)
                     ▼
┌─────────────────────────────────────────────────────┐
│          Backend (Node.js + Express)                │
│  - API gateway and business logic layer             │
│  - Request validation and rate limiting             │
│  - Response caching and error handling              │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS + API Key
                     ▼
┌─────────────────────────────────────────────────────┐
│       Google Chrome UX Report API                   │
│  - Real-world user experience data                  │
│  - Core Web Vitals metrics                          │
└─────────────────────────────────────────────────────┘
```

### Design Patterns Used

**Frontend:**

- Container/Presentational Pattern
- Custom Hooks Pattern
- Composition Pattern
- Factory Pattern (for API clients)

**Backend:**

- Layered Architecture (Routes → Controllers → Services)
- Middleware Chain Pattern
- Factory Pattern (for API clients)

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Version | Purpose           |
| --------------- | ------- | ----------------- |
| **React**       | 18.2.x  | UI framework      |
| **TypeScript**  | 5.3.x   | Type safety       |
| **Material-UI** | 5.15.x  | Component library |
| **Axios**       | 1.6.x   | HTTP client       |

### Backend

| Technology     | Version  | Purpose       |
| -------------- | -------- | ------------- |
| **Node.js**    | 18.x LTS | Runtime       |
| **Express**    | 4.18.x   | Web framework |
| **TypeScript** | 5.3.x    | Type safety   |

---

## 🚀 Getting Started

### Prerequisites

```bash
# Required
Node.js >= 20.x
npm >= 9.x
```

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/crux-dashboard.git
cd crux-dashboard
```

#### 2. Setup Backend

```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Add your Google CrUX API key
# Edit .env and set: GOOGLE_CRUX_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Backend will run on `http://localhost:3000`

#### 3. Setup Frontend

```bash
cd frontend
npm install

# Start development server
npm start
```

Frontend will run on `http://localhost:5173`

```

## 📁 Project Structure

```

crux-dashboard/
├── frontend/ # React application
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # Reusable React Components
│ │ ├── constants/ # Reusable constants
│ │ ├── container/ # React Functional Components
│ │ ├── layout/ # React layout
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API services
│ │ ├── theme/ # React/Material-UI Theme
│ │ ├── utils/ # Utility functions
│ │ ├── types/ # TypeScript types
│ │ └── App.tsx # Root component
│ │ └── main.tsx # Root main component
│ ├── .env.example # Environment template
│ ├── package.json
│ ├── .gitignore
│ └── README.md # Frontend documentation
│
├── backend/ # Node.js API server
│ ├── src/
│ │ ├── controllers/ # Request handlers
│ │ ├── services/ # Business logic
│ │ ├── constants/ # Resuable Logic
│ │ ├── middleware/ # Express middleware
│ │ ├── routes/ # API routes
│ │ ├── utils/ # Utilities
│ │ ├── config/ # Configuration
│ │ └── app.ts # Express app
│ ├── .env.example # Environment template
│ ├── package.json
│ ├── .gitignore
│ └── README.md # Backend documentation
│
├── .gitignore
└── README.md # This file

````

---

## 📚 Documentation

Detailed documentation for each component:

- **[Frontend Documentation](./frontend/README.md)** - React app architecture, components, and hooks
- **[Backend Documentation](./backend/README.md)** - API endpoints, services, and deployment
---

## 🎯 Key Features Explained

### 1. Individual URL Summaries

Performance score (0-100) for each URL with visual indicators

### 2. Detailed Table

Sortable and filterable raw data with all metrics

### 3. Production-Grade Code Quality

- **TypeScript** for type safety
---

### 4. User Validation Measures

- **Input Validation** - Zod schema validation on all inputs
- **CORS** - Configured for specific origins only
- **Helmet.js** - Security headers automatically added
- **Error Handling** - Global App Error Handling
---

## 📈 Performance Optimizations

### Frontend

- **Component Composition** - Used Atomic UI components

### Backend

- **Request Batching** - Multiple URLs in single request
- **Gzip Compression** - Reduced payload size
---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "API Key Missing" Error

**Solution:**

```bash
# Backend .env file must have:
GOOGLE_CRUX_API_KEY=your_actual_api_key_here
````

#### Issue: CORS Error

**Solution:**

```bash
# Backend .env file:
CORS_ORIGIN=http://localhost:3000
```

#### Issue: Port Already in Use

**Solution:**

```bash
# Change ports in .env files
# Frontend: REACT_APP_API_BASE_URL=http://localhost:5001/api
# Backend: PORT=5001
```

---

## 👥 Authors

**Sanchit Singh**

- GitHub: https://github.com/sanchit-codes-tech
- LinkedIn: https://www.linkedin.com/in/sanchit-singh-17957916a/

---

## 🗺️ Features

- [x] Multi-URL batch analysis
- [x] Smart caching system
- [x] Three-tier visualization
- [x] Glassmorphic UI
- [x] Historical data tracking

---

**Made with ❤️ for better web performance**
