# Complete Setup Guide

## Backend + Frontend Integration

### Step 1: Install Backend Dependencies

Open Command Prompt or PowerShell in the project folder:

```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Start the Backend Server

**Option A: Using the batch file (Windows)**
```bash
# Double-click start_server.bat
# OR run in terminal:
start_server.bat
```

**Option B: Manual start**
```bash
cd backend
python app.py
```

The backend will start at: **http://localhost:5000**

You should see:
```
🚀 Starting Currency Exchange Forecasting API...
📊 API running at: http://localhost:5000
📡 Available endpoints:
   - GET /api/rates
   - GET /api/rates/<pair>
   - GET /api/historical/<pair>?days=7
   - GET /api/forecast/<pair>?days=7
   - GET /api/news
   - GET /api/alerts
   - GET /api/stats
```

### Step 3: Open the Frontend

**Option A: Direct Browser Open**
1. Navigate to the project root folder
2. Double-click `index.html`
3. The dashboard will open in your browser

**Option B: Using Python HTTP Server (Recommended)**

Open a NEW terminal window (keep backend running):

```bash
# In project root (not backend folder)
python -m http.server 8000
```

Then open: **http://localhost:8000**

**Option C: Using VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

### Step 4: Verify Everything Works

1. **Check Backend**: Open http://localhost:5000 in browser
   - You should see: `{"message": "Currency Exchange Forecasting API", ...}`

2. **Check Frontend**: Open http://localhost:8000 (or your chosen method)
   - Currency rates should update automatically
   - Charts should load with real data
   - No console errors

3. **Test API Connection**:
   - Open browser DevTools (F12)
   - Go to Console tab
   - You should see successful API calls
   - No CORS errors

## Architecture

```
Frontend (Port 8000)          Backend (Port 5000)
├── index.html                ├── app.py
├── forecast.html             ├── requirements.txt
├── news.html                 └── README.md
├── alerts.html
└── assets/
    ├── css/style.css
    └── js/
        ├── api.js      ←→  Flask REST API
        ├── main.js
        ├── forecast.js
        └── config.js
```

## API Endpoints

### Get All Rates
```bash
curl http://localhost:5000/api/rates
```

### Get Specific Rate
```bash
curl http://localhost:5000/api/rates/USD/EUR
```

### Get Historical Data
```bash
curl http://localhost:5000/api/historical/USD/EUR?days=7
```

### Get Forecast
```bash
curl http://localhost:5000/api/forecast/USD/EUR?days=7
```

### Get News
```bash
curl http://localhost:5000/api/news
```

### Get Alerts
```bash
curl http://localhost:5000/api/alerts
```

### Get Stats
```bash
curl http://localhost:5000/api/stats
```

## Features Now Working

✅ Real-time currency rate updates from backend
✅ Historical data charts with API data
✅ ML predictions from backend
✅ Dynamic forecast charts
✅ System statistics from API
✅ Automatic fallback to dummy data if API fails
✅ CORS enabled for cross-origin requests

## Troubleshooting

### Backend won't start
- **Error**: `ModuleNotFoundError: No module named 'flask'`
- **Solution**: Run `pip install -r requirements.txt` in backend folder

### Frontend can't connect to backend
- **Error**: Console shows "Failed to fetch" or CORS errors
- **Solution**: 
  1. Make sure backend is running on port 5000
  2. Check if `flask-cors` is installed
  3. Verify API_BASE_URL in `assets/js/api.js` is correct

### Port already in use
- **Error**: `Address already in use`
- **Solution**: 
  - Change port in `backend/app.py`: `app.run(port=5001)`
  - Update `assets/js/api.js`: `const API_BASE_URL = 'http://localhost:5001/api'`

### Charts not loading
- **Error**: Charts show but no data
- **Solution**: 
  1. Check browser console for errors
  2. Verify backend is responding: http://localhost:5000/api/rates
  3. Check network tab in DevTools

## Development Tips

### Hot Reload
- Backend: Flask auto-reloads on code changes (debug=True)
- Frontend: Use Live Server for auto-refresh on file changes

### Testing API
Use browser or tools like:
- Browser: http://localhost:5000/api/rates
- Postman
- curl commands
- Thunder Client (VS Code extension)

### Debugging
1. **Backend**: Check terminal where `python app.py` is running
2. **Frontend**: Open browser DevTools (F12) → Console tab
3. **Network**: DevTools → Network tab to see API calls

## Next Steps

1. **Add Real Currency API**: Integrate Alpha Vantage, Fixer.io, etc.
2. **Database**: Add PostgreSQL/MongoDB for data persistence
3. **Authentication**: Add user login and JWT tokens
4. **WebSockets**: Real-time updates without polling
5. **Deploy**: Host on Heroku, AWS, or Vercel

## Quick Commands Reference

```bash
# Start backend
cd backend
python app.py

# Start frontend (new terminal)
python -m http.server 8000

# Install dependencies
pip install -r backend/requirements.txt

# Test API
curl http://localhost:5000/api/rates
```

Enjoy your full-stack Currency Exchange Forecasting System! 🚀
