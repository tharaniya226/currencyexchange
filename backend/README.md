# Backend API - Currency Exchange Forecasting

Flask-based REST API for real-time currency exchange rates and ML predictions.

## Setup Instructions

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Server

```bash
python app.py
```

The API will start at: **http://localhost:5000**

## API Endpoints

### Get All Currency Rates
```
GET http://localhost:5000/api/rates
```

### Get Specific Currency Rate
```
GET http://localhost:5000/api/rates/USD/EUR
```

### Get Historical Data
```
GET http://localhost:5000/api/historical/USD/EUR?days=7
```

### Get Forecast/Prediction
```
GET http://localhost:5000/api/forecast/USD/EUR?days=7
```

### Get Market News
```
GET http://localhost:5000/api/news
```

### Get Active Alerts
```
GET http://localhost:5000/api/alerts
```

### Get System Stats
```
GET http://localhost:5000/api/stats
```

## Testing the API

Open your browser or use curl:

```bash
# Test if API is running
curl http://localhost:5000/

# Get all rates
curl http://localhost:5000/api/rates

# Get forecast
curl http://localhost:5000/api/forecast/USD/EUR?days=7
```

## CORS Configuration

CORS is enabled for all origins to allow frontend communication.

## Features

- Real-time currency rate simulation
- Historical data generation
- ML prediction simulation
- Market news feed
- Alert system
- System statistics

## Note

This backend uses simulated data for demonstration. For production, integrate with real APIs like:
- Alpha Vantage
- Fixer.io
- Open Exchange Rates
- Currency Layer
