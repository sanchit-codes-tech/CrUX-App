# Frontend - Chrome UX Report Dashboard

> React + TypeScript application with Material-UI for visualizing Chrome User Experience Report metrics

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Components](#components)
- [Custom Hooks](#custom-hooks)
- [State Management](#state-management)
- [Styling Approach](#styling-approach)
- [Best Practices](#best-practices)

---

## 🎯 Overview

The frontend is a single-page React application that provides an intuitive interface for analyzing Core Web Vitals metrics. It features smart caching, real-time validation, and a modern glassmorphic UI.

### Key Features

✅ **Smart URL Management** - Single search bar with chip-based URL handling  
✅ **Intelligent Caching** - Tracks analyzed URLs to prevent duplicate API calls  
✅ **Three-Tier Visualization** - Global summary, individual scores, detailed table  
✅ **Advanced Filtering** - Filter by metric and threshold  
✅ **Dynamic Sorting** - Sort any column ascending/descending  
✅ **Glassmorphic Design** - Modern frosted glass UI with smooth animations  
✅ **Responsive Layout** - Works on desktop, tablet, and mobile  
✅ **Accessibility** - WCAG 2.1 compliant with keyboard navigation

---

## 🏗️ Architecture

### Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Presentation Layer (Components)                        │
│  ├── Common: Reusable UI components                     │
│  ├── Features: Domain-specific components               │
│  └── Layout: Page structure                             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Business Logic Layer (Custom Hooks)                    │
│  ├── useCruxData: Data fetching & caching               │
│  └── useTableFilters: Filtering & sorting               │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Service Layer (API Communication)                      │
│  ├── API Client: Axios instance with interceptors       │
│  └── CrUX API: Domain-specific endpoints                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│  Utility Layer                                          │
│  ├── Validators: Input validation                       │
│  ├── Formatters: Data formatting                        │
│  └── Constants: Application constants                   │
└─────────────────────────────────────────────────────────┘
```

### Design Patterns

1. **Container/Presentational Pattern** - Separation of logic and UI
2. **Custom Hooks Pattern** - Reusable business logic
3. **Composition Pattern** - Build complex UIs from simple components

---

## 🛠️ Tech Stack

| Technology      | Version | Purpose           |
| --------------- | ------- | ----------------- |
| **React**       | 18.2.0  | UI framework      |
| **TypeScript**  | 5.3.3   | Type safety       |
| **Material-UI** | 5.15.3  | Component library |
| **Axios**       | 1.6.0   | HTTP client       |

---

## 📁 Project Structure

```
frontend/src/
├── components/
│   ├── common/                    # Reusable components
│   │   ├── Button/
│   │   │   ├── Button.tsx         # Component
│   │   ├── Input/
│   │   ├── Toast.tsx
│   ├── Table/
│   │   ├── Body.tsx
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   ├── Widgets/
│   │   ├── InputToolTip.tsx
│   │   ├── MetricCell.tsx        # Individual metric cell
│   │   ├── MetricFiler.tsx
│   │   └── SortControl.tsx       # Per-URL card
│   │   └── URLSummaryCard.tsx
│   ├── Utility/
│   │   ├── SummaryUtils.tsx
|   |   ├── Validators.ts             # Input validation
│   |   ├── TextFormatters.ts         # Data formatting
|   |
│   ├── container/                 # Feature components
│   │   │   ├── UrlInput.tsx        # Single search bar with chips
│   │   │   ├── ResultsTable.tsx    # Main table
│   │   │   ├── UrlSummaryList.tsx  # Grid of cards
|   |   |   |── FilterPanel.tsx
│   │   │   └── index.ts
│   │
│   └── layout/                    # Layout components
│       ├── Header.tsx
│       ├── Container.tsx
│
├── hooks/                         # Custom React hooks
│   ├── useCruxData.ts              # API data fetching & caching
│   ├── useTableFilters.ts          # Filtering & sorting logic
|
├── constants/                     # Custom React hooks
│   ├── config.ts                   # App configuration
│   ├── constants.ts                # Reusable constants
│   ├── enums.ts                    # Typescript enums
│   ├── styles.ts                   # MUI Global Styles
│
├── services/                      # API services
│   └── api/
│       ├── ApiClient.ts           # Gloabl API Client Instance
│
├── types/                         # TypeScript definitions
│   ├── AppTypes.ts
│
├── utils/                         # Utility functions

│
├── .env.example                   # Example Environment config
│
├── theme/                         # Styling
│   └── theme.ts                    # MUI theme + glassmorphism
│
├── App.tsx                        # Root component
├── index.tsx                      # Entry point
├── setupTests.ts                  # Test configuration
└── index.css                      # Global styles
```

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 18.x
npm >= 9.x
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Open browser
# http://localhost:3000
```

### Environment Variables

Create `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:3000/api
REACT_APP_ENV=development
```

---

## 🧩 Components

### Common Components (Reusable)

#### Button

```typescript
import Button from "@/components/common/Button";

<Button variant="primary" loading={isLoading} onClick={handleClick}>
  Analyze URLs
</Button>;
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outlined' | 'text'
- `loading`: boolean
- `disabled`: boolean
- All standard MUI ButtonProps

#### DataTable

```typescript
import DataTable from "@/components/common/DataTable";

<DataTable
  columns={columns}
  data={data}
  sortBy="lcp"
  sortOrder="asc"
  onSort={handleSort}
  rowKey={(row) => row.id}
  loading={false}
/>;
```

**Props:**

- `columns`: Column definition array
- `data`: Array of data objects
- `sortBy`: Current sort column
- `sortOrder`: 'asc' | 'desc'
- `onSort`: Sort handler function
- `rowKey`: Unique key function
- `loading`: boolean

#### Toast Notification System

```typescript
import { useToast } from "@/components/common/Toast";

const Component = () => {
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  showSuccess("Analysis complete!");
  showError("Failed to fetch data");
  showInfo("3 URLs already analyzed");
  showWarning("API rate limit approaching");
};
```

### Feature Components

#### UrlInput (Single Search Bar with Chips)

```typescript
<UrlInput
  urls={urls}
  onUrlsChange={setUrls}
  onSearch={handleSearch}
  loading={loading}
  maxUrls={10}
/>
```

**Features:**

- Single input field
- Real-time URL validation
- Chip-based URL display
- Duplicate prevention
- Enter key support
- Add button in input
- Clear all button

#### ResultsTable

```typescript
<ResultsTable
  results={results}
  sortBy={sortBy}
  sortOrder={sortOrder}
  onSort={handleSort}
  loading={loading}
/>
```

**Features:**

- Sortable columns
- Glassmorphic rows
- Metric cells with tooltips
- Responsive design
- Hover effects

#### UrlSummaryCard

```typescript
<UrlSummaryCard result={cruxResult} />
```

**Displays:**

- URL
- Overall score (0-100)
- Rating badge
- All 6 metrics with ratings
- Performance summary stats

---

## 🪝 Custom Hooks

### useCruxData

Main hook for data fetching and caching.

```typescript
const {
  allResults, // All accumulated results
  globalSummary, // Summary across all URLs
  loading, // Loading state
  error, // Error message
  fetchData, // Fetch function
  clearAllData, // Clear everything
  clearError, // Clear error only
  analyzedUrlsCount, // Number of analyzed URLs
} = useCruxData();
```

**Key Features:**

- ✅ Automatic URL deduplication
- ✅ Result accumulation
- ✅ Summary recalculation
- ✅ Toast notifications
- ✅ Error handling

## 🗂️ State Management

### Strategy: No Redux Required

**Rationale:**

- Moderate application complexity
- Most state is server-side data
- Custom Hooks sufficient
- Smaller bundle size

---

## 🎨 Styling Approach

### Material-UI Theme + Glassmorphism

```typescript
// theme.ts
export const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

// Glassmorphism utilities
export const glassmorphismStyles = {
  light: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  tableRow: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.8)",
      transform: "translateY(-2px)",
    },
  },
};
```

### Usage

```typescript
import { glassmorphismStyles } from "@/styles/theme";

<Box sx={{ ...glassmorphismStyles.card }}>Content</Box>;
```

---

## ✅ Best Practices Implemented

### 1. TypeScript for Type Safety

```typescript
// ❌ Bad: No types
const fetchData = (url) => { ... }

// ✅ Good: Fully typed
const fetchData = async (url: string): Promise<CruxResult> => { ... }
```

### 2. Constants Over Magic Strings

```typescript
// ❌ Bad: Magic strings
if (metric === 'largest_contentful_paint') { ... }

// ✅ Good: Constants
import { METRIC_LABELS } from '@/utils/constants';
if (metric === METRIC_LABELS.lcp) { ... }
```

### 3. Component Composition

```typescript
// ✅ Build complex UIs from simple components
<DataTable>
  <TableHeader />
  <TableRow>
    <TableCell />
  </TableRow>
</DataTable>
```

### 4. Custom Hooks for Reusability

```typescript
// ✅ Extract logic into reusable hooks
const { data, loading, error, fetchData } = useCruxData();
```

### 6. Prop Validation

```typescript
// ✅ TypeScript interfaces for props
interface ButtonProps {
  variant: "primary" | "secondary";
  loading?: boolean;
  onClick: () => void;
}
```

### 7. Minimal Re-renders

```typescript
// ✅ Memoization
const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);
const memoizedCallback = useCallback(() => handleClick(), [deps]);
const MemoizedComponent = React.memo(MyComponent);
```

---

## 🏗️ Build & Deployment

### Development Build

```bash
npm start
# Runs on http://localhost:3000
# Hot reload enabled
```

### Production Build

```bash
# Build for production
npm run build

# Output directory: build/
# Optimized and minified
```

---

### Performance Optimizations

1. **Component Composition**

```typescript
// Lazy load components
<MaterialTheme>
  <Header/>
  <Container>
    {children}
  </Container>
</Suspense>;
```

---

## 🔧 Configuration Files

### package.json (Key Scripts)

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "test:ci": "CI=true react-scripts test --coverage",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,json}\"",
    "type-check": "tsc --noEmit",
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "build"]
}
```

### .eslintrc.js

```javascript
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: Module not found errors

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Port 5173 already in use

**Solution:**

```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

#### Issue: CORS errors

**Solution:**

```env
# Update .env.development
REACT_APP_API_BASE_URL=http://localhost:5000/api

# Ensure backend CORS is configured correctly
```

---

## 📚 Key Concepts Explained

### Why Single Search Bar with Chips?

**Problem:** Multiple input fields are cluttered and hard to manage.

**Solution:** Single search bar where URLs become chips after adding.

**Benefits:**

- Clean, modern UI
- Easy to see all URLs at once
- Simple to add/remove URLs
- Better mobile experience

### Why Custom Hooks?

**Problem:** Logic mixed with UI makes components hard to read and reuse.

**Solution:** Extract logic into custom hooks.

**Benefits:**

- Reusable across components
- Cleaner component code
- Single responsibility principle

### Why No Redux?

**Problem:** Redux adds complexity and boilerplate.

**Solution:** Use React Context + Custom Hooks for state management.

**When Redux is needed:**

- Very large applications (50+ components)
- Complex state sharing across many components
- Need for time-travel debugging
- Multiple data sources

**Our case:**

- Moderate complexity (1 major component, 10 atomic components)
- Most state is server data
- Hooks sufficient

### Why TypeScript?

**Problem:** JavaScript lacks type safety, leading to runtime errors.

**Solution:** TypeScript provides compile-time type checking.

**Benefits:**

- Catch errors before runtime
- Better IDE autocomplete
- Self-documenting code
- Safer refactoring
- Better team collaboration

---

## 🎓 Learning Resources

### React Best Practices

- [React Official Docs](https://react.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Kent C. Dodds Blog](https://kentcdodds.com/blog)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Material-UI

- [MUI Documentation](https://mui.com/material-ui/getting-started/)
- [MUI Templates](https://mui.com/material-ui/getting-started/templates/)

---

2. **Naming Conventions**

- Components: PascalCase (`Button`, `DataTable`)
- Hooks: camelCase with 'use' prefix (`useCruxData`)
- Files: Match component name (`Button.tsx`)
- Constants: UPPER_SNAKE_CASE (`MAX_URLS`, `API_BASE_URL`)

3. **File Organization**

- Use barrel exports (`index.ts`)
- Group related components in folders

---

## 📝 Changelog

### Version 1.0.0 (Current)

- ✅ Initial release
- ✅ Multi-URL batch analysis
- ✅ Three-tier visualization
- ✅ Glassmorphic UI
- ✅ Advanced filtering & sorting

---

**Built with ❤️ using React + TypeScript + Material-UI**
