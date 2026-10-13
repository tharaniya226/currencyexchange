# System Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:8000                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │Forecast  │  │  News    │  │ Alerts   │   │
│  │index.html│  │forecast  │  │news.html │  │alerts    │   │
│  │          │  │.html     │  │          │  │.html     │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              JavaScript Layer                         │  │
│  │  ┌────────┐  ┌────────┐  ┌─────────┐  ┌─────────┐  │  │
│  │  │ api.js │  │main.js │  │forecast │  │alerts.js│  │  │
│  │  │        │  │        │  │.js      │  │         │  │  │
│  │  └────────┘  └────────┘  └─────────┘  └─────────┘  │  │
│  │       │                                               │  │
│  │       └──────────► API Service ◄─────────────────────┤  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              CSS Layer                                │  │
│  │  • style.css (Custom styles)                          │  │
│  │  • Tailwind CSS (Utility classes)                     │  │
│  │  • Animations & Glassmorphism                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              │ (Fetch API)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND LAYER                           │
│                   http://localhost:5000                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Flask REST API (app.py)                  │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │           API Endpoints                          │ │  │
│  │  │                                                   │ │  │
│  │  │  GET  /api/rates                                 │ │  │
│  │  │  GET  /api/rates/<pair>                          │ │  │
│  │  │  GET  /api/historical/<pair>?days=N              │ │  │
│  │  │  GET  /api/forecast/<pair>?days=N                │ │  │
│  │  │  GET  /api/news                                  │ │  │
│  │  │  GET  /api/alerts                                │ │  │
│  │  │  GET  /api/stats                                 │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │         Business Logic                           │ │  │
│  │  │                                                   │ │  │
│  │  │  • Rate Simulation Engine                        │ │  │
│  │  │  • Historical Data Generator                     │ │  │
│  │  │  • ML Prediction Engine (Simulated)              │ │  │
│  │  │  • News Feed Generator                           │ │  │
│  │  │  • Alert System                                  │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │         Data Layer                               │ │  │
│  │  │                                                   │ │  │
│  │  │  • BASE_RATES (In-memory)                        │ │  │
│  │  │  • Random Data Generation                        │ │  │
│  │  │  • NumPy for calculations                        │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Flask-CORS                               │  │
│  │  (Enables cross-origin requests from frontend)        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Live Currency Rates Update

```
User opens Dashboard
        ↓
main.js calls fetchCurrencyRates()
        ↓
api.js sends GET /api/rates
        ↓
Flask app.py processes request
        ↓
Generates current rates with variations
        ↓
Returns JSON response
        ↓
api.js receives data
        ↓
main.js updates DOM
        ↓
User sees updated rates
        ↓
[Repeat every 5 seconds]
```

### 2. Forecast Chart Loading

```
User navigates to Forecast page
        ↓
forecast.js initializes
        ↓
Calls loadForecastData()
        ↓
api.js sends two requests:
  - GET /api/historical/USD/EUR?days=7
  - GET /api/forecast/USD/EUR?days=7
        ↓
Flask generates:
  - Historical data (past 7 days)
  - Predictions (next 7 days with confidence)
        ↓
Returns JSON responses
        ↓
forecast.js processes data
        ↓
Chart.js renders visualization
        ↓
User sees interactive chart
```

### 3. User Changes Currency Pair

```
User selects different pair from dropdown
        ↓
Event listener triggers
        ↓
forecast.js updates currentPair
        ↓
Calls loadForecastData(newPair, days)
        ↓
New API requests sent
        ↓
Backend generates new data
        ↓
Chart updates with new data
        ↓
User sees updated forecast
```

## Component Interaction

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├──► index.html ──────┐
       │                     │
       ├──► forecast.html ───┤
       │                     │
       ├──► news.html ───────┼──► style.css
       │                     │
       └──► alerts.html ─────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  JavaScript    │
                    │  ┌──────────┐  │
                    │  │ config.js│  │
                    │  └────┬─────┘  │
                    │       │        │
                    │  ┌────▼─────┐  │
                    │  │  api.js  │◄─┼─── Fetch API
                    │  └────┬─────┘  │
                    │       │        │
                    │  ┌────▼─────┐  │
                    │  │ main.js  │  │
                    │  │forecast  │  │
                    │  │alerts.js │  │
                    │  └──────────┘  │
                    └────────┬───────┘
                             │
                             │ HTTP
                             ▼
                    ┌────────────────┐
                    │  Flask Backend │
                    │                │
                    │  ┌──────────┐  │
                    │  │  app.py  │  │
                    │  │          │  │
                    │  │ Routes   │  │
                    │  │ Logic    │  │
                    │  │ Data Gen │  │
                    │  └──────────┘  │
                    └────────────────┘
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  • HTML5 (Structure)                    │
│  • CSS3 + Tailwind (Styling)            │
│  • Font Awesome (Icons)                 │
│  • Google Fonts (Typography)            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Application Layer               │
│  • JavaScript ES6+ (Logic)              │
│  • Chart.js (Visualization)             │
│  • Fetch API (HTTP Client)              │
│  • DOM Manipulation                     │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         API Layer                       │
│  • Flask (Web Framework)                │
│  • Flask-CORS (Cross-origin)            │
│  • RESTful Endpoints                    │
│  • JSON Responses                       │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Data Layer                      │
│  • In-memory data structures            │
│  • NumPy (Calculations)                 │
│  • Random data generation               │
│  • (Future: Database integration)       │
└─────────────────────────────────────────┘
```

## Request/Response Cycle

```
┌──────────┐                           ┌──────────┐
│          │   1. HTTP GET Request     │          │
│ Frontend │──────────────────────────►│ Backend  │
│          │   /api/rates              │          │
│          │                           │          │
│          │   2. Process Request      │          │
│          │      • Parse URL          │          │
│          │      • Generate data      │          │
│          │      • Format JSON        │          │
│          │                           │          │
│          │   3. HTTP Response        │          │
│          │◄──────────────────────────│          │
│          │   JSON data               │          │
│          │                           │          │
│          │   4. Update UI            │          │
│          │      • Parse JSON         │          │
│          │      • Update DOM         │          │
│          │      • Render charts      │          │
└──────────┘                           └──────────┘
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   Frontend   │         │   Backend    │             │
│  │              │         │              │             │
│  │  Netlify/    │         │  Heroku/     │             │
│  │  Vercel      │◄───────►│  AWS/        │             │
│  │              │  HTTPS  │  DigitalOcean│             │
│  └──────────────┘         └──────┬───────┘             │
│                                   │                      │
│                                   ▼                      │
│                          ┌──────────────┐               │
│                          │   Database   │               │
│                          │              │               │
│                          │  PostgreSQL/ │               │
│                          │  MongoDB     │               │
│                          └──────────────┘               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Security Considerations

```
┌─────────────────────────────────────────┐
│         Security Layers                 │
├─────────────────────────────────────────┤
│  1. HTTPS (SSL/TLS)                     │
│  2. CORS Configuration                  │
│  3. Input Validation                    │
│  4. Rate Limiting (Future)              │
│  5. Authentication (Future)             │
│  6. API Keys (Future)                   │
└─────────────────────────────────────────┘
```

---

This architecture provides a solid foundation for a scalable, maintainable currency exchange forecasting system!
