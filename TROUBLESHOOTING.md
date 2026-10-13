# 🔧 Troubleshooting Guide

## ✅ Current Status

Your servers are running:
- ✅ **Backend**: Running on http://localhost:5000
- ✅ **Frontend**: Running on http://localhost:8000

## 🧪 Test the Connection

### Step 1: Test Backend Directly
Open in your browser:
```
http://localhost:5000/api/rates
```

You should see JSON data like:
```json
{
  "USD/EUR": {
    "rate": 0.92,
    "change": 0.45,
    "trend": "up"
  },
  ...
}
```

### Step 2: Test Connection Page
Open in your browser:
```
http://localhost:8000/test_connection.html
```

This will test if frontend can connect to backend.

### Step 3: Open Main Application
```
http://localhost:8000/index.html
```

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to backend"

**Symptoms**: Frontend shows no data, console errors

**Solutions**:
1. Check if backend is running:
   - Look for terminal with "Running on http://127.0.0.1:5000"
   - If not running, start it: `python app.py` (in backend folder)

2. Check if port 5000 is blocked:
   - Try: http://localhost:5000 in browser
   - Should show: `{"message": "Currency Exchange Forecasting API", ...}`

3. Check browser console (F12):
   - Look for CORS errors
   - Look for "Failed to fetch" errors

### Issue 2: CORS Errors

**Symptoms**: Console shows "CORS policy" error

**Solution**: Backend already has CORS enabled. If still seeing errors:
1. Make sure backend is running
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try in incognito/private window

### Issue 3: Port Already in Use

**Symptoms**: "Address already in use" error

**Backend (port 5000)**:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Frontend (port 8000)**:
```bash
# Use different port
python -m http.server 8001
```

### Issue 4: Backend Starts but Crashes

**Check backend terminal for errors**:
- Missing dependencies? Run: `pip install -r requirements.txt`
- Python version? Need Python 3.7+
- Syntax errors? Check backend/app.py

### Issue 5: Frontend Shows Old Data

**Solution**: Hard refresh browser
- Windows: Ctrl + Shift + R
- Mac: Cmd + Shift + R

## 📊 Verify Everything is Working

### Checklist:
- [ ] Backend terminal shows "Running on http://127.0.0.1:5000"
- [ ] Frontend terminal shows "Serving HTTP on :: port 8000"
- [ ] http://localhost:5000/api/rates shows JSON data
- [ ] http://localhost:8000/test_connection.html shows SUCCESS
- [ ] http://localhost:8000/index.html loads dashboard
- [ ] Currency rates are updating
- [ ] No errors in browser console (F12)

## 🔍 Debug Steps

### 1. Check Backend Logs
Look at the terminal where backend is running. You should see:
```
127.0.0.1 - - [date] "GET /api/rates HTTP/1.1" 200 -
```

If you see 404 or 500 errors, there's a problem with the API.

### 2. Check Browser Console
Press F12 in browser, go to Console tab:
- ✅ Good: No red errors
- ❌ Bad: "Failed to fetch", "CORS", "Network error"

### 3. Check Network Tab
Press F12, go to Network tab:
- Look for requests to localhost:5000
- Check if they're successful (status 200)
- Check response data

### 4. Test API Manually
Open new browser tab:
```
http://localhost:5000/api/rates
http://localhost:5000/api/news
http://localhost:5000/api/stats
```

All should return JSON data.

## 🚀 Quick Restart

If nothing works, restart everything:

### 1. Stop Both Servers
- Press Ctrl+C in both terminals

### 2. Restart Backend
```bash
cd backend
python app.py
```
Wait for: "Running on http://127.0.0.1:5000"

### 3. Restart Frontend (new terminal)
```bash
python -m http.server 8000
```

### 4. Open Browser
```
http://localhost:8000/test_connection.html
```

## 💡 Pro Tips

1. **Keep both terminals visible** so you can see logs
2. **Check backend logs** when frontend has issues
3. **Use test_connection.html** to verify connection
4. **Clear browser cache** if seeing old data
5. **Try incognito mode** to rule out cache issues

## 🆘 Still Not Working?

### Check These:

1. **Python Version**:
   ```bash
   python --version
   ```
   Should be 3.7 or higher

2. **Dependencies Installed**:
   ```bash
   cd backend
   pip list | findstr Flask
   ```
   Should show Flask and flask-cors

3. **Firewall**:
   - Windows Firewall might block localhost
   - Try disabling temporarily

4. **Antivirus**:
   - Some antivirus blocks local servers
   - Add exception for Python

5. **Different Browser**:
   - Try Chrome, Firefox, or Edge
   - Some browsers have strict security

## 📞 Quick Commands

```bash
# Check if backend is running
curl http://localhost:5000/api/rates

# Check if frontend is running
curl http://localhost:8000

# List running Python processes
tasklist | findstr python

# Kill all Python processes (careful!)
taskkill /F /IM python.exe
```

## ✅ Success Indicators

When everything works:
- Backend terminal shows API requests
- Frontend loads without errors
- Currency rates update every 5 seconds
- Charts display data
- No console errors

---

**Need more help?** Check the backend terminal logs for specific error messages.
