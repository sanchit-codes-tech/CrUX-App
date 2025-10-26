# Chrome UX Report API - Backend

> Production-ready REST API for fetching and analyzing Chrome User Experience Report data

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Best Practices](#best-practices)

---

## 🎯 Overview

This backend service provides a REST API for fetching real-world user experience metrics from the Chrome UX Report (CrUX) database. It aggregates performance data from actual Chrome users visiting websites and returns standardized metrics including LCP, FID, CLS, FCP, TTFB, and INP.

### Why This Backend?

1. **Abstraction Layer** - Simplifies Google CrUX API complexity for frontend
2. **Batch Processing** - Fetches multiple URLs in parallel for performance
3. **Data Transformation** - Converts CrUX format to frontend-friendly structure
4. **Error Handling** - Graceful handling of missing URLs and API failures
5. **Security** - Keeps API keys server-side, never exposed to client

---

## ✨ Features

- ✅ **Multi-URL Analysis** - Fetch metrics for multiple URLs in one request
- ✅ **Parallel Processing** - Uses Promise.all for simultaneous API calls
- ✅ **Data Validation** - Input sanitization and URL format validation
- ✅ **Error Recovery** - Graceful handling of URLs not in CrUX database
- ✅ **CORS Support** - Configured for cross-origin requests
- ✅ **Environment Config** - Support for dev/staging/production environments
- ✅ **API Key Security** - Secure key management via environment variables

---

## 🛠️ Tech Stack

### Option 1: Node.js + Express (Recommended)

```
- Node.js v18+ (LTS)
- Express.js v4.18+
- Axios v1.6+
- dotenv v16.0+
- cors v2.8+
- Helmet
- Compression
```

---

## 🏗️ Architecture

```
backend/
├── src/
│   ├── app.ts                    # Express app configuration
│   ├── routes.ts                 # CrUX API routes
│   ├── controllers.ts            # Request handlers
│   ├── services/
│   │   ├── apiClient.ts          # Singleton API Client Instance
│   │   └── endPoint.ts           # Static endpoints
│   ├── middleware/
│   │   ├── globalErrorHandler.ts # Global error handling
│   │   ├── validator.ts          # Request validation
│   ├── utils/
│   │   ├── validation.ts         # App validation
├── .env                          # Environment variables (gitignored)
├── index.ts                      # Application entry point
├── .gitignore
├── package.json
├── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ or Python 3.11+
- Google Cloud Project with CrUX API enabled
- CrUX API key from Google Cloud Console

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd crux-backend
```

### Step 2: Install Dependencies

**Node.js:**

```bash
npm install
```

### Step 3: Set Up Google CrUX API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Chrome UX Report API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Chrome UX Report API"
   - Click "Enable"
4. Create API credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
   - (Optional) Restrict the key to CrUX API only

### Step 4: Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Google CrUX API
CRUX_API_KEY=your_google_crux_api_key_here
CRUX_API_URL=https://chromeuxreport.googleapis.com/v1/records:queryRecord

# CORS Settings
CORS_ORIGIN=http://localhost:3000
```

### Step 5: Run the Server

**Development mode (Node.js):**

```bash
npm run dev
```

The server will start on `http://localhost:3000`

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:3000/api/crux
```

### Endpoints

#### 1. Fetch CrUX Report

**POST** `/api/crux/report`

Fetch Chrome UX Report data for one or more URLs.

**Request Body:**

```json
{
  "urls": [
    "https://developer.intuit.com",
    "https://quickbooks.intuit.com",
    "https://turbotax.intuit.com"
  ],
  "formFactor": "DESKTOP" // Optional: DESKTOP (default), PHONE, TABLET
}
```

**Response (Success - 200 OK):**

```json
[
  {
    "url": "https://developer.intuit.com",
    "metrics": {
      "lcp": {
        "p75": 2450.5,
        "category": "GOOD"
      },
      "fid": {
        "p75": 85.2,
        "category": "GOOD"
      },
      "cls": {
        "p75": 0.08,
        "category": "GOOD"
      },
      "fcp": {
        "p75": 1650.3,
        "category": "GOOD"
      },
      "ttfb": {
        "p75": 720.8,
        "category": "GOOD"
      },
      "inp": {
        "p75": 180.5,
        "category": "GOOD"
      }
    },
    "formFactor": "DESKTOP",
    "loadDate": "2025-10-26T10:30:00.000Z"
  },
  {
    "url": "https://quickbooks.intuit.com",
    "metrics": {
      "lcp": {
        "p75": 3200.7,
        "category": "NEEDS_IMPROVEMENT"
      }
      // ... other metrics
    },
    "formFactor": "DESKTOP",
    "loadDate": "2025-10-26T10:30:00.000Z"
  }
]
```

**Response (Bad Request - 400):**

```json
{
  "error": "Bad Request",
  "message": "URLs array is required and must not be empty",
  "success": false
  "statusCode": 400,
}
```

**Response (Validation Error - 400):**

```json
{
  "error": "Validation Error",
  "message": "Invalid URL format",
  "success": false,
  "statusCode": 400
}
```

**Response (Server Error - 500):**

```json
{
  "error": "Internal Server Error",
  "message": "Failed to fetch CrUX data",
  "success": false,
  "statusCode": 500
}
```

---

### Metric Definitions

| Metric   | Full Name                 | Unit  | Good   | Needs Improvement | Poor   |
| -------- | ------------------------- | ----- | ------ | ----------------- | ------ |
| **LCP**  | Largest Contentful Paint  | ms    | ≤ 2500 | ≤ 4000            | > 4000 |
| **FID**  | First Input Delay         | ms    | ≤ 100  | ≤ 300             | > 300  |
| **CLS**  | Cumulative Layout Shift   | score | ≤ 0.1  | ≤ 0.25            | > 0.25 |
| **FCP**  | First Contentful Paint    | ms    | ≤ 1800 | ≤ 3000            | > 3000 |
| **TTFB** | Time to First Byte        | ms    | ≤ 800  | ≤ 1800            | > 1800 |
| **INP**  | Interaction to Next Paint | ms    | ≤ 200  | ≤ 500             | > 500  |

**Categories:**

- **GOOD**: 75% or more of user experiences meet the "good" threshold
- **NEEDS_IMPROVEMENT**: 50% or more meet "good" + "needs improvement" thresholds
- **POOR**: Less than 50% meet the above criteria

---

## 🔧 Configuration

### Environment Variables

| Variable       | Description                          | Default       | Required |
| -------------- | ------------------------------------ | ------------- | -------- |
| `NODE_ENV`     | Environment (development/production) | `development` | Yes      |
| `PORT`         | Server port                          | `5000`        | Yes      |
| `HOST`         | Server host                          | `localhost`   | No       |
| `CRUX_API_KEY` | Google CrUX API key                  | -             | Yes      |
| `CRUX_API_URL` | CrUX API endpoint                    | Google's URL  | Yes      |
| `CORS_ORIGIN`  | Allowed CORS origins                 | `*`           | Yes      |

### CORS Configuration

**Development:**

```javascript
cors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

---

**Build and run:**

```bash
docker build -t crux-api .
docker run -p 5000:5000 --env-file .env crux-api
```

---

## 📝 Best Practices

### 1. Gloabl Level Error Handling

:Global Level Error Handling for Graceful Exception Handling

```javascript
try {
  const data = await cruxService.fetchCruxData(url);
  return data;
} catch (error) {
  if (error.response?.status === 404) {
    return { url, metrics: null, error: "URL not found" };
  }
  throw new Error(`Failed to fetch CrUX data: ${error.message}`);
}
```

### 2. Input Validation

Validate all inputs before processing:

```javascript
const validateUrls = (urls) => {
  if (!Array.isArray(urls)) {
    throw new ValidationError("URLs must be an array");
  }

  const urlPattern = /^https?:\/\/.+\..+/;
  const invalidUrls = urls.filter((url) => !urlPattern.test(url));

  if (invalidUrls.length > 0) {
    throw new ValidationError("Invalid URL format", { invalidUrls });
  }
};
```

### 6. Security Headers

Add security headers with Helmet:

```javascript
const helmet = require("helmet");
app.use(helmet());
```

### 7. Environment-Based Configuration

Never hardcode sensitive values:

```javascript
// ❌ Bad
const apiKey = "AIzaSyABC123...";

// ✅ Good
const apiKey = process.env.CRUX_API_KEY;
```

---

## 🐛 Troubleshooting

### Issue: API Key Invalid

**Error:** `401 Unauthorized - API key not valid`

**Solution:**

1. Verify API key in `.env` file
2. Check if CrUX API is enabled in Google Cloud Console
3. Ensure API key restrictions allow CrUX API

### Issue: CORS Errors

**Error:** `Access to fetch at '...' has been blocked by CORS policy`

**Solution:**

1. Add frontend origin to CORS_ORIGIN in `.env`
2. Ensure credentials are properly configured
3. Check if OPTIONS preflight requests are handled

### Issue: URL Not Found in CrUX

**Error:** `URL not found in Chrome UX Report database`

**Explanation:** CrUX only includes URLs with sufficient traffic. Not all websites are in the database.

**Solution:**

- Try the origin URL instead (e.g., `https://example.com` vs `https://example.com/page`)
- Ensure the URL receives enough Chrome user traffic
- Wait 28 days after site launch for data to appear

---

**Built with ❤️ Node.js & Typesctipt**
