from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
from datetime import timedelta
from ml_model import predictor, analyzer
from chatbot import bot

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Base currency rates (simulated)
BASE_RATES = {
    'USD/EUR': 0.92,
    'USD/INR': 83.24,
    'GBP/USD': 1.27,
    'USD/JPY': 149.82,
    'EUR/GBP': 0.86,
    'USD/CAD': 1.35,
    'AUD/USD': 0.66
}

# Generate historical data
def generate_historical_data(pair, days=7):
    base_rate = BASE_RATES.get(pair, 1.0)
    data = []
    current_date = datetime.datetime.now() - timedelta(days=days)
    
    for i in range(days):
        variation = random.uniform(-0.02, 0.02)
        rate = base_rate * (1 + variation)
        data.append({
            'date': (current_date + timedelta(days=i)).strftime('%Y-%m-%d'),
            'rate': round(rate, 4),
            'open': round(rate * 0.998, 4),
            'high': round(rate * 1.005, 4),
            'low': round(rate * 0.995, 4),
            'close': round(rate, 4)
        })
    
    return data

# ML Prediction simulation
def generate_prediction(pair, days=7):
    base_rate = BASE_RATES.get(pair, 1.0)
    current_date = datetime.datetime.now()
    predictions = []
    
    trend = random.choice(['bullish', 'bearish'])
    confidence = random.uniform(70, 95)
    
    for i in range(1, days + 1):
        if trend == 'bullish':
            variation = random.uniform(0.001, 0.015)
        else:
            variation = random.uniform(-0.015, -0.001)
        
        predicted_rate = base_rate * (1 + variation * i)
        upper_bound = predicted_rate * 1.02
        lower_bound = predicted_rate * 0.98
        
        predictions.append({
            'date': (current_date + timedelta(days=i)).strftime('%Y-%m-%d'),
            'predicted_rate': round(predicted_rate, 4),
            'upper_confidence': round(upper_bound, 4),
            'lower_confidence': round(lower_bound, 4)
        })
    
    return {
        'pair': pair,
        'trend': trend,
        'confidence': round(confidence, 2),
        'predictions': predictions
    }

@app.route('/')
def home():
    return jsonify({
        'message': 'Currency Exchange Forecasting API',
        'version': '1.0.0',
        'status': 'running'
    })

@app.route('/api/rates', methods=['GET'])
def get_rates():
    """Get current exchange rates for all pairs"""
    rates = {}
    for pair, base_rate in BASE_RATES.items():
        variation = random.uniform(-0.005, 0.005)
        current_rate = base_rate * (1 + variation)
        change_percent = variation * 100
        
        rates[pair] = {
            'rate': round(current_rate, 4),
            'change': round(change_percent, 2),
            'trend': 'up' if change_percent > 0 else 'down',
            'timestamp': datetime.datetime.now().isoformat()
        }
    
    return jsonify(rates)

@app.route('/api/rates/<path:pair>', methods=['GET'])
def get_rate(pair):
    """Get current rate for specific currency pair"""
    if pair not in BASE_RATES:
        return jsonify({'error': 'Currency pair not found'}), 404
    
    base_rate = BASE_RATES[pair]
    variation = random.uniform(-0.005, 0.005)
    current_rate = base_rate * (1 + variation)
    change_percent = variation * 100
    
    return jsonify({
        'pair': pair,
        'rate': round(current_rate, 4),
        'change': round(change_percent, 2),
        'trend': 'up' if change_percent > 0 else 'down',
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.route('/api/historical/<path:pair>', methods=['GET'])
def get_historical(pair):
    """Get historical data for a currency pair"""
    days = request.args.get('days', default=7, type=int)
    
    if pair not in BASE_RATES:
        return jsonify({'error': 'Currency pair not found'}), 404
    
    data = generate_historical_data(pair, days)
    
    return jsonify({
        'pair': pair,
        'period': f'{days} days',
        'data': data
    })

@app.route('/api/forecast/<path:pair>', methods=['GET'])
def get_forecast(pair):
    """Get ML prediction for a currency pair"""
    days = request.args.get('days', default=7, type=int)
    
    if pair not in BASE_RATES:
        return jsonify({'error': 'Currency pair not found'}), 404
    
    # Get historical data for the model
    historical_data = generate_historical_data(pair, 30)  # Use 30 days for better prediction
    
    # Use ML model for prediction
    prediction = predictor.predict(pair, historical_data, days)
    
    # Add technical indicators
    prediction['technical_indicators'] = {
        'sma_7': analyzer.calculate_sma(historical_data, 7),
        'ema_7': analyzer.calculate_ema(historical_data, 7),
        'rsi': analyzer.calculate_rsi(historical_data, 14),
        'macd': analyzer.calculate_macd(historical_data)
    }
    
    return jsonify(prediction)

@app.route('/api/news', methods=['GET'])
def get_news():
    """Get market news"""
    news_items = [
        {
            'id': 1,
            'title': 'Federal Reserve Signals Interest Rate Hike',
            'summary': 'The Federal Reserve indicated a potential 0.25% interest rate increase in the upcoming meeting, citing persistent inflation concerns.',
            'tags': ['Inflation', 'Policy Change'],
            'impact': 'high',
            'timestamp': (datetime.datetime.now() - timedelta(hours=2)).isoformat(),
            'source': 'Reuters'
        },
        {
            'id': 2,
            'title': 'EU-UK Trade Agreement Boosts GBP',
            'summary': 'A new trade agreement between the European Union and United Kingdom has been finalized, leading to increased confidence in the British Pound.',
            'tags': ['Trade'],
            'impact': 'medium',
            'timestamp': (datetime.datetime.now() - timedelta(hours=5)).isoformat(),
            'source': 'Bloomberg'
        },
        {
            'id': 3,
            'title': 'Geopolitical Tensions Impact Oil Prices',
            'summary': 'Rising tensions in the Middle East have caused oil prices to surge by 3.2%, affecting currency markets globally.',
            'tags': ['War', 'Crisis'],
            'impact': 'high',
            'timestamp': (datetime.datetime.now() - timedelta(hours=8)).isoformat(),
            'source': 'Financial Times'
        },
        {
            'id': 4,
            'title': "India's GDP Growth Exceeds Expectations",
            'summary': 'India reported a 7.8% GDP growth rate for Q4, surpassing analyst predictions.',
            'tags': ['Economy'],
            'impact': 'medium',
            'timestamp': (datetime.datetime.now() - timedelta(hours=12)).isoformat(),
            'source': 'Economic Times'
        }
    ]
    
    return jsonify(news_items)

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Get active alerts"""
    alerts = [
        {
            'id': 1,
            'type': 'volatility',
            'pair': 'EUR/USD',
            'message': 'High volatility detected. Current movement: +1.2%',
            'severity': 'warning',
            'timestamp': (datetime.datetime.now() - timedelta(minutes=15)).isoformat()
        },
        {
            'id': 2,
            'type': 'prediction',
            'pair': 'GBP/USD',
            'message': 'Prediction changed to Bullish with 91% confidence',
            'severity': 'info',
            'timestamp': (datetime.datetime.now() - timedelta(hours=1)).isoformat()
        }
    ]
    
    return jsonify(alerts)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get system statistics"""
    return jsonify({
        'active_pairs': len(BASE_RATES),
        'prediction_accuracy': round(random.uniform(85, 95), 1),
        'active_alerts': random.randint(3, 8),
        'last_update': datetime.datetime.now().isoformat()
    })

@app.route('/api/model/info', methods=['GET'])
def get_model_info():
    """Get ML model information"""
    return jsonify({
        'model_type': predictor.model_type,
        'accuracy': predictor.model_accuracy,
        'metrics': predictor.get_model_metrics(),
        'feature_importance': predictor.get_feature_importance(),
        'training_info': {
            'samples': predictor.training_samples,
            'last_trained': (datetime.datetime.now() - timedelta(hours=6)).isoformat(),
            'next_training': (datetime.datetime.now() + timedelta(hours=18)).isoformat()
        }
    })

@app.route('/api/technical/<path:pair>', methods=['GET'])
def get_technical_analysis(pair):
    """Get technical analysis for a currency pair"""
    if pair not in BASE_RATES:
        return jsonify({'error': 'Currency pair not found'}), 404
    
    historical_data = generate_historical_data(pair, 30)
    
    return jsonify({
        'pair': pair,
        'indicators': {
            'sma_7': round(analyzer.calculate_sma(historical_data, 7), 4),
            'sma_14': round(analyzer.calculate_sma(historical_data, 14), 4),
            'ema_7': round(analyzer.calculate_ema(historical_data, 7), 4),
            'ema_14': round(analyzer.calculate_ema(historical_data, 14), 4),
            'rsi': analyzer.calculate_rsi(historical_data, 14),
            'macd': analyzer.calculate_macd(historical_data)
        },
        'interpretation': {
            'rsi_signal': 'Overbought' if analyzer.calculate_rsi(historical_data, 14) > 70 else 'Oversold' if analyzer.calculate_rsi(historical_data, 14) < 30 else 'Neutral',
            'trend': 'Bullish' if analyzer.calculate_sma(historical_data, 7) > analyzer.calculate_sma(historical_data, 14) else 'Bearish'
        }
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """AI Chatbot endpoint"""
    data = request.get_json()
    
    if not data or 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400
    
    user_message = data['message']
    
    # Get current rates for context
    rates = {}
    for pair, base_rate in BASE_RATES.items():
        variation = random.uniform(-0.005, 0.005)
        current_rate = base_rate * (1 + variation)
        change_percent = variation * 100
        
        rates[pair] = {
            'rate': round(current_rate, 4),
            'change': round(change_percent, 2),
            'trend': 'up' if change_percent > 0 else 'down'
        }
    
    # Process message with bot
    response = bot.process_message(user_message, rates_data=rates)
    
    return jsonify({
        'message': user_message,
        'response': response,
        'timestamp': datetime.datetime.now().isoformat(),
        'bot_name': bot.name
    })

# ===== WALLET API ENDPOINTS =====

@app.route('/api/wallet/balance', methods=['GET'])
def get_wallet_balance():
    """Get wallet balance information"""
    return jsonify({
        'balance': 12450.75,
        'spent': 2780.50,
        'income': 15230.00,
        'currency': 'USD',
        'last_updated': datetime.datetime.now().isoformat()
    })

@app.route('/api/wallet/cards', methods=['GET'])
def get_wallet_cards():
    """Get user's cards"""
    cards = [
        {
            'id': 1,
            'type': 'visa',
            'number': '3455 4562 7710 3507',
            'holder': 'Lusiana',
            'expiry': '05/26',
            'cvv': '***',
            'balance': 8450.50,
            'status': 'active',
            'is_primary': True
        },
        {
            'id': 2,
            'type': 'mastercard',
            'number': '5234 8765 4321 9876',
            'holder': 'Lusiana',
            'expiry': '08/27',
            'cvv': '***',
            'balance': 4000.25,
            'status': 'active',
            'is_primary': False
        }
    ]
    return jsonify(cards)

@app.route('/api/wallet/transactions', methods=['GET'])
def get_wallet_transactions():
    """Get wallet transaction history"""
    transactions = [
        {
            'id': 1,
            'type': 'payment',
            'merchant': 'Amazon',
            'category': 'shopping',
            'amount': -125.50,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(hours=2)).strftime('%Y-%m-%d %H:%M'),
            'status': 'completed',
            'card_last4': '3507'
        },
        {
            'id': 2,
            'type': 'income',
            'merchant': 'Salary Deposit',
            'category': 'income',
            'amount': 5000.00,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=3)).strftime('%Y-%m-%d %H:%M'),
            'status': 'completed',
            'card_last4': '3507'
        },
        {
            'id': 3,
            'type': 'payment',
            'merchant': 'Starbucks',
            'category': 'food',
            'amount': -12.50,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d %H:%M'),
            'status': 'completed',
            'card_last4': '3507'
        },
        {
            'id': 4,
            'type': 'payment',
            'merchant': 'Uber',
            'category': 'transportation',
            'amount': -25.00,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d %H:%M'),
            'status': 'pending',
            'card_last4': '3507'
        },
        {
            'id': 5,
            'type': 'payment',
            'merchant': 'Netflix',
            'category': 'entertainment',
            'amount': -20.00,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d %H:%M'),
            'status': 'completed',
            'card_last4': '3507'
        },
        {
            'id': 6,
            'type': 'payment',
            'merchant': 'Spotify',
            'category': 'entertainment',
            'amount': -20.36,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d %H:%M'),
            'status': 'completed',
            'card_last4': '3507'
        },
        {
            'id': 7,
            'type': 'payment',
            'merchant': 'Dribbble',
            'category': 'subscription',
            'amount': -56.10,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=10)).strftime('%Y-%m-%d %H:%M'),
            'status': 'completed',
            'card_last4': '3507'
        }
    ]
    return jsonify(transactions)

@app.route('/api/wallet/spending', methods=['GET'])
def get_spending_analysis():
    """Get spending analysis by category"""
    spending = {
        'categories': [
            {'name': 'Shopping', 'amount': 1234.50, 'percentage': 45, 'icon': 'shopping-cart', 'color': '#667eea'},
            {'name': 'Food & Dining', 'amount': 856.30, 'percentage': 31, 'icon': 'utensils', 'color': '#10b981'},
            {'name': 'Entertainment', 'amount': 456.20, 'percentage': 17, 'icon': 'film', 'color': '#8b5cf6'},
            {'name': 'Transportation', 'amount': 234.00, 'percentage': 7, 'icon': 'car', 'color': '#ef4444'}
        ],
        'total_spent': 2780.50,
        'period': 'This Month',
        'comparison': {
            'last_month': 2450.00,
            'change_percent': 13.5,
            'trend': 'up'
        }
    }
    return jsonify(spending)

@app.route('/api/wallet/payments/recent', methods=['GET'])
def get_recent_payments():
    """Get recent subscription payments"""
    payments = [
        {
            'id': 1,
            'service': 'Spotify',
            'icon': 'spotify',
            'amount': 20.36,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d'),
            'status': 'completed',
            'color': '#1db954'
        },
        {
            'id': 2,
            'service': 'Dribbble',
            'icon': 'dribbble',
            'amount': 56.10,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=10)).strftime('%Y-%m-%d'),
            'status': 'completed',
            'color': '#ea4c89'
        },
        {
            'id': 3,
            'service': 'Netflix',
            'icon': 'film',
            'amount': 20.00,
            'currency': 'USD',
            'date': (datetime.datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d'),
            'status': 'completed',
            'color': '#e50914'
        }
    ]
    return jsonify(payments)

@app.route('/api/wallet/card/add', methods=['POST'])
def add_card():
    """Add a new card"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'Card data is required'}), 400
    
    # Simulate card addition
    new_card = {
        'id': random.randint(100, 999),
        'type': data.get('type', 'visa'),
        'number': data.get('number', '****'),
        'holder': data.get('holder', 'User'),
        'expiry': data.get('expiry', '12/25'),
        'status': 'active',
        'created_at': datetime.datetime.now().isoformat()
    }
    
    return jsonify({
        'success': True,
        'message': 'Card added successfully',
        'card': new_card
    }), 201

@app.route('/api/wallet/transfer', methods=['POST'])
def transfer_money():
    """Transfer money"""
    data = request.get_json()
    
    if not data or 'amount' not in data or 'recipient' not in data:
        return jsonify({'error': 'Amount and recipient are required'}), 400
    
    transaction = {
        'id': random.randint(1000, 9999),
        'type': 'transfer',
        'amount': data['amount'],
        'recipient': data['recipient'],
        'status': 'completed',
        'timestamp': datetime.datetime.now().isoformat()
    }
    
    return jsonify({
        'success': True,
        'message': 'Transfer completed successfully',
        'transaction': transaction
    })

if __name__ == '__main__':
    print("🚀 Starting Currency Exchange Forecasting API...")
    print("📊 API running at: http://localhost:5000")
    print("📡 Available endpoints:")
    print("   - GET /api/rates")
    print("   - GET /api/rates/<pair>")
    print("   - GET /api/historical/<pair>?days=7")
    print("   - GET /api/forecast/<pair>?days=7")
    print("   - GET /api/news")
    print("   - GET /api/alerts")
    print("   - GET /api/stats")
    print("   - GET /api/model/info")
    print("   - GET /api/technical/<pair>")
    print("   - POST /api/chat")
    print("   - GET /api/wallet/balance")
    print("   - GET /api/wallet/cards")
    print("   - GET /api/wallet/transactions")
    print("   - GET /api/wallet/spending")
    print("   - GET /api/wallet/payments/recent")
    print("   - POST /api/wallet/card/add")
    print("   - POST /api/wallet/transfer")
    print("🤖 ML Model: LSTM Neural Network (89.5% accuracy)")
    print("💬 AI Chatbot: ForexBot (Ready)")
    print("💳 Wallet API: Ready")
    app.run(debug=True, host='0.0.0.0', port=5000)
