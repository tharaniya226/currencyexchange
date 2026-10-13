# Quick Start Guide

## How to Run the Application

### Option 1: Direct Browser Open
1. Navigate to the project folder
2. Double-click `index.html`
3. The dashboard will open in your default browser

### Option 2: Using Live Server (Recommended for Development)
If you have VS Code with Live Server extension:
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. The app will open at `http://localhost:5500`

### Option 3: Using Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

### Option 4: Using Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then open: http://localhost:8080
```

## Navigation

- **Dashboard**: Main page with live rates and trends
- **Forecast**: Detailed predictions and ML insights
- **News**: Market news with risk indicators
- **Alerts**: Notification settings and history

## Key Features to Try

1. **Live Updates**: Watch currency rates update every 5 seconds on the dashboard
2. **Hover Effects**: Hover over cards to see smooth animations
3. **Mobile Menu**: Resize browser to see responsive hamburger menu
4. **Toggle Alerts**: Enable/disable different alert types on the Alerts page
5. **Chart Interactions**: Hover over chart points to see detailed values

## Customization Tips

### Change Currency Pairs
Edit `assets/js/main.js` - look for the `currencyData` object

### Modify Update Frequency
Edit `assets/js/main.js` - change the interval in `setInterval(updateCurrencyRates, 5000)`

### Add More News Items
Edit `news.html` - duplicate and modify news card structure

### Adjust Colors
Edit `assets/css/style.css` - modify accent color classes

## Troubleshooting

**Charts not showing?**
- Ensure you have internet connection (Chart.js loads from CDN)
- Check browser console for errors

**Styles not loading?**
- Verify file paths are correct
- Check that Tailwind CSS CDN is accessible

**Mobile menu not working?**
- Clear browser cache
- Check JavaScript console for errors

## Browser Requirements

- Modern browser with JavaScript enabled
- Internet connection for CDN resources (Tailwind, Chart.js, Font Awesome)
- Recommended: Chrome, Firefox, Safari, or Edge (latest versions)

## Performance Notes

- The app is lightweight and runs entirely in the browser
- No backend or database required
- All data is simulated for demonstration
- Suitable for portfolio projects and prototypes

Enjoy exploring the Currency Exchange Forecasting System!
