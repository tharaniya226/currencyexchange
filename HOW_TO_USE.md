# 🎯 How to Use Your Currency Forecasting System

## ✅ Current Status
- Backend: ✅ Running on http://localhost:5000
- Frontend: ✅ Running on http://localhost:8000

---

## 🌐 Step-by-Step Guide

### 1. Open the Website
```
http://localhost:8000/index.html
```

### 2. Navigate to Forecast Page
Click "Forecast" in the navigation menu or go to:
```
http://localhost:8000/forecast.html
```

### 3. Use the Forecast Page

**What you should see:**
- Currency Pair dropdown (USD/EUR, USD/INR, etc.)
- Time Range dropdown (1, 7, 30, 90 days)
- "Update Forecast" button
- Chart showing predicted trends

**How to use it:**
1. Select a currency pair from dropdown
2. Select time range (7 days is default)
3. Click "Update Forecast" button
4. Chart will load with:
   - Blue line = Historical data
   - Green dashed line = Predicted trend
   - Light green lines = Confidence bands

---

## 🔧 If Chart Doesn't Show

### Quick Fix:
1. **Open browser console** (Press F12)
2. **Go to Console tab**
3. **Look for errors** (red text)
4. **Refresh page** (Ctrl + Shift + R)

### Check Backend:
Open this URL to test if backend is working:
```
http://localhost:5000/api/forecast/USD/EUR?days=7
```

**Should show JSON like:**
```json
{
  "pair": "USD/EUR",
  "trend": "bullish",
  "confidence": 87.5,
  "predictions": [...]
}
```

---

## 📊 What Each Page Does

### Dashboard (index.html)
- Shows live currency rates
- Updates every 5 seconds
- Displays AI predictions
- Shows trend charts

### Forecast (forecast.html)
- Shows detailed predictions
- Interactive chart with confidence bands
- Select different currency pairs
- Choose prediction timeframe

### News (news.html)
- Market news with risk tags
- Impact indicators
- Latest updates

### Alerts (alerts.html)
- Toggle notification settings
- View recent alerts
- Customize preferences

---

## 🐛 Troubleshooting

### Problem: Chart not loading
**Solution:**
1. Check browser console (F12)
2. Make sure backend is running
3. Test: http://localhost:5000/api/forecast/USD/EUR?days=7
4. Refresh page (Ctrl + Shift + R)

### Problem: "Update Forecast" button does nothing
**Solution:**
1. Open console (F12)
2. Click button
3. Look for console messages
4. Should see: "Update button clicked"
5. Should see: "Loading forecast for..."

### Problem: Shows error message
**Solution:**
1. Check if both servers are running
2. Backend: http://localhost:5000
3. Frontend: http://localhost:8000
4. Restart both if needed

---

## 🎮 Try These Features

### On Dashboard:
- Watch rates update automatically
- Hover over chart points
- See AI predictions change

### On Forecast:
- Change currency pair → Chart updates
- Change time range → Chart updates
- Click "Update Forecast" → Reloads data

### On News:
- Read market news
- See risk tags (Inflation, War, etc.)
- Check impact levels

### On Alerts:
- Toggle switches on/off
- See notification history
- Watch popup animations

---

## 📱 Mobile View

The site is fully responsive!

**To test:**
1. Resize browser window
2. Or press F12 → Click device icon
3. Hamburger menu appears on mobile
4. All features work on small screens

---

## 🔄 Refresh Instructions

### Hard Refresh (clears cache):
- **Windows**: Ctrl + Shift + R
- **Mac**: Cmd + Shift + R

### Normal Refresh:
- **Windows**: F5 or Ctrl + R
- **Mac**: Cmd + R

---

## ✅ Success Checklist

When everything works:
- [ ] Dashboard loads with currency cards
- [ ] Rates update every 5 seconds
- [ ] Charts display on dashboard
- [ ] Forecast page loads
- [ ] Forecast chart shows when you select pair
- [ ] "Update Forecast" button works
- [ ] No errors in console (F12)
- [ ] News page shows articles
- [ ] Alerts page has toggles

---

## 💡 Pro Tips

1. **Keep console open** (F12) to see what's happening
2. **Check Network tab** to see API calls
3. **Hard refresh** if you see old data
4. **Test backend URLs** directly in browser
5. **Look for console errors** if something breaks

---

## 🆘 Still Not Working?

### Do This:
1. Open: http://localhost:8000/test_connection.html
2. Should show: "✅ SUCCESS!"
3. If not, backend isn't connected

### Then:
1. Check both terminals are running
2. Backend should show: "Running on http://127.0.0.1:5000"
3. Frontend should show: "Serving HTTP on :: port 8000"

### Finally:
1. Go to: http://localhost:5000/api/forecast/USD/EUR?days=7
2. Should see JSON data
3. If yes, backend works!
4. If no, restart backend

---

**Your forecast system is ready! Just follow the steps above.** 🚀📈
