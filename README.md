# Real-Time Currency Exchange Rate Forecasting System

A modern, responsive frontend application for real-time currency exchange rate forecasting with AI-powered predictions.

## Features

- **Live Currency Rates**: Real-time exchange rate tracking for major currency pairs
- **AI Predictions**: Machine learning-based trend forecasting with confidence levels
- **Market News**: AI-generated news summaries with risk indicators
- **Custom Alerts**: Personalized notification system for rate changes and predictions
- **Responsive Design**: Fully optimized for desktop and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations

## Project Structure

```
currency-exchange-forecasting/
│
├── index.html              # Dashboard page
├── forecast.html           # Forecast page with predictions
├── news.html              # News summary page
├── alerts.html            # Alerts and notifications page
├── README.md              # Project documentation
│
└── assets/
    ├── css/
    │   └── style.css      # Main stylesheet
    ├── js/
    │   ├── main.js        # Core JavaScript functionality
    │   ├── forecast.js    # Forecast page logic
    │   └── alerts.js      # Alerts page logic
    └── images/            # Image assets (optional)
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with animations
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)**: Interactive functionality
- **Chart.js**: Data visualization for trends and forecasts
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins & Inter font families

## Pages Overview

### 1. Dashboard (index.html)
- Live currency rate cards with real-time updates
- 7-day trend chart
- AI prediction cards with confidence levels
- Risk alert notifications
- Quick statistics

### 2. Forecast (forecast.html)
- Currency pair selection dropdown
- Time range filters (1, 7, 30, 90 days)
- Predicted trend visualization
- ML model metrics and insights
- Key performance indicators

### 3. News Summary (news.html)
- AI-generated market news cards
- Risk highlight tags (Inflation, War, Policy Change, etc.)
- Impact level indicators
- Timestamp for each news item

### 4. Alerts (alerts.html)
- Toggle switches for alert preferences
- Recent notification list
- Animated alert popup
- Notification categories

## Design Features

- **Color Scheme**: Dark theme with blue (#3b82f6) and green (#10b981) accents
- **Glassmorphism**: Frosted glass effect on cards
- **Animations**: 
  - Gradient background animation
  - Smooth hover effects
  - Loading spinners
  - Slide-in alerts
  - Progress bar animations
- **Typography**: Poppins for headings, Inter for body text
- **Responsive**: Mobile-first approach with hamburger menu

## Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a modern web browser
3. **Navigate** between pages using the navigation menu

No build process or server required - just open the HTML files directly!

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Dummy Data

The application uses simulated data for demonstration purposes:

- Currency rates update every 5 seconds with random fluctuations
- Charts display sample historical and predicted data
- News items are static examples
- Alerts are triggered periodically for demo

## Customization

### Changing Colors
Edit the CSS variables in `assets/css/style.css`:
- `.text-accent-blue` and `.bg-accent-blue` for primary color
- `.text-accent-green` and `.bg-accent-green` for success color

### Adding Currency Pairs
Update the `currencyData` object in `assets/js/main.js`

### Modifying Charts
Edit Chart.js configurations in `assets/js/main.js` and `assets/js/forecast.js`

## Future Enhancements

- Backend API integration for real currency data
- User authentication and personalization
- Historical data export
- Advanced filtering options
- Multi-language support
- Dark/Light theme toggle

## License

This is a frontend demonstration project. Feel free to use and modify as needed.

## Credits

- Design & Development: Currency Exchange Forecasting Team
- Icons: Font Awesome
- Charts: Chart.js
- Fonts: Google Fonts
