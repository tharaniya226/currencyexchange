# 🚀 Quick Start - Currency Exchange Forecasting System

## Two Simple Steps to Run

### Step 1: Start Backend (Terminal 1)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

**OR** double-click: `start_server.bat`

✅ Backend running at: **http://localhost:5000**

---

### Step 2: Start Frontend (Terminal 2)

```bash
python -m http.server 8000
```

**OR** double-click: `start_frontend.bat`

✅ Frontend running at: **http://localhost:8000**

---

## Open in Browser

Navigate to: **http://localhost:8000**

---

## What You'll See

- 📊 **Dashboard**: Live currency rates updating every 5 seconds
- 📈 **Forecast**: ML predictions with confidence bands
- 📰 **News**: Market news with risk indicators
- 🔔 **Alerts**: Customizable notifications

---

## Localhost Links

- **Frontend**: http://localhost:8000
- **Backend API**: http://localhost:5000
- **API Test**: http://localhost:5000/api/rates

---

## Need Help?

See `SETUP_GUIDE.md` for detailed instructions and troubleshooting.

---

## Project Structure

```
📁 currency-exchange-forecasting/
│
├── 🌐 Frontend Files
│   ├── index.html (Dashboard)
│   ├── forecast.html
│   ├── news.html
│   ├── alerts.html
│   └── assets/
│       ├── css/style.css
│       └── js/
│           ├── api.js (Backend connector)
│           ├── main.js
│           ├── forecast.js
│           └── config.js
│
├── 🔧 Backend Files
│   └── backend/
│       ├── app.py (Flask API)
│       └── requirements.txt
│
└── 📚 Documentation
    ├── START_HERE.md (This file)
    ├── SETUP_GUIDE.md (Detailed guide)
    ├── README.md
    └── QUICKSTART.md
```

---

**Enjoy building with your Currency Exchange Forecasting System!** 💰📈
