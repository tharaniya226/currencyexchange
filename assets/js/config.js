// ===== Configuration File =====
// This file contains all configurable settings for the application

const CONFIG = {
    // Application Settings
    app: {
        name: 'ForexCast',
        version: '1.0.0',
        description: 'Real-Time Currency Exchange Rate Forecasting System'
    },

    // Update Intervals (in milliseconds)
    intervals: {
        currencyUpdate: 5000,      // Update currency rates every 5 seconds
        chartRefresh: 10000,       // Refresh charts every 10 seconds
        alertCheck: 30000,         // Check for new alerts every 30 seconds
        newsUpdate: 60000          // Update news every 60 seconds
    },

    // Currency Pairs Configuration
    currencyPairs: [
        { code: 'USD/EUR', name: 'US Dollar to Euro', icon: 'fa-euro-sign' },
        { code: 'USD/INR', name: 'US Dollar to Rupee', icon: 'fa-rupee-sign' },
        { code: 'GBP/USD', name: 'Pound to US Dollar', icon: 'fa-pound-sign' },
        { code: 'USD/JPY', name: 'US Dollar to Yen', icon: 'fa-yen-sign' },
        { code: 'EUR/GBP', name: 'Euro to Pound', icon: 'fa-sterling-sign' },
        { code: 'USD/CAD', name: 'US Dollar to Canadian Dollar', icon: 'fa-dollar-sign' },
        { code: 'AUD/USD', name: 'Australian Dollar to US Dollar', icon: 'fa-dollar-sign' }
    ],

    // Chart Configuration
    chart: {
        defaultTimeRange: 7,       // Default time range in days
        colors: {
            primary: '#3b82f6',
            secondary: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#8b5cf6'
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        }
    },

    // Alert Thresholds
    alerts: {
        priceChangeThreshold: 1.0,     // Alert when price changes by 1% or more
        volatilityThreshold: 2.0,      // High volatility threshold
        confidenceThreshold: 85,       // Minimum confidence for predictions
        riskLevels: {
            low: 30,
            medium: 60,
            high: 85
        }
    },

    // API Configuration (for future backend integration)
    api: {
        baseUrl: 'https://api.example.com',
        endpoints: {
            rates: '/api/v1/rates',
            forecast: '/api/v1/forecast',
            news: '/api/v1/news',
            alerts: '/api/v1/alerts'
        },
        timeout: 10000,               // API timeout in milliseconds
        retryAttempts: 3
    },

    // UI Configuration
    ui: {
        animationSpeed: 300,          // Default animation speed in ms
        toastDuration: 3000,          // Toast notification duration
        loadingDelay: 500,            // Delay before showing loading spinner
        theme: {
            dark: {
                background: '#0f172a',
                surface: '#1e293b',
                text: '#ffffff',
                textSecondary: '#9ca3af'
            }
        }
    },

    // Feature Flags
    features: {
        liveUpdates: true,
        notifications: true,
        darkMode: true,
        exportData: false,            // Future feature
        multiLanguage: false,         // Future feature
        advancedCharts: false         // Future feature
    },

    // Risk Tags Configuration
    riskTags: [
        { name: 'Inflation', color: 'red', severity: 'high' },
        { name: 'War', color: 'orange', severity: 'high' },
        { name: 'Policy Change', color: 'yellow', severity: 'medium' },
        { name: 'Trade', color: 'blue', severity: 'medium' },
        { name: 'Economy', color: 'green', severity: 'low' },
        { name: 'Technology', color: 'purple', severity: 'low' },
        { name: 'Crisis', color: 'red', severity: 'high' }
    ],

    // Prediction Models
    models: {
        lstm: {
            name: 'LSTM Neural Network',
            accuracy: 94.2,
            trainingDataPoints: 10000
        },
        arima: {
            name: 'ARIMA Model',
            accuracy: 87.5,
            trainingDataPoints: 5000
        },
        randomForest: {
            name: 'Random Forest',
            accuracy: 89.3,
            trainingDataPoints: 8000
        }
    }
};

// Export configuration (for module systems)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make available globally
window.CONFIG = CONFIG;
