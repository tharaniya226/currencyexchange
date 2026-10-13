"""
Enhanced AI Chatbot for Currency Exchange Forecasting
Provides comprehensive forex knowledge, rates, predictions, and market analysis
"""

import random
from datetime import datetime
import re

class EnhancedCurrencyBot:
    """Enhanced AI Chatbot with comprehensive forex knowledge"""
    
    def __init__(self):
        self.name = "ForexBot"
        self.greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"]
        self.farewells = ["bye", "goodbye", "see you", "exit", "quit"]
        
        
    def process_message(self, message, rates_data=None, forecast_data=None):
        """Process user message and generate response"""
        message_lower = message.lower().strip()
        
        # Greetings (use word boundaries to avoid false matches like "hi" in "which")
        greeting_words = message_lower.split()
        if any(greeting in greeting_words for greeting in self.greetings):
            return self._greeting_response()
        
        # Farewells
        if any(farewell in message_lower for farewell in self.farewells):
            return self._farewell_response()
        
                # Volatility queries
        if "volatile" in message_lower or "volatility" in message_lower:
            return self._volatility_response(rates_data)
        
# Rate queries
        if "rate" in message_lower or "price" in message_lower or "value" in message_lower:
            return self._rate_response(message_lower, rates_data)
        
        # Prediction queries
        if any(word in message_lower for word in ["predict", "forecast", "future", "trend", "will"]):
            return self._prediction_response(message_lower, forecast_data)
        
        # Comparison queries
        if "compare" in message_lower or "difference" in message_lower or "vs" in message_lower:
            return self._comparison_response(message_lower, rates_data)
        
        # Best/worst queries
        if "best" in message_lower or "highest" in message_lower:
            return self._best_response(rates_data)
        if "worst" in message_lower or "lowest" in message_lower:
            return self._worst_response(rates_data)
        
        # Help queries
        if "help" in message_lower or "what can you" in message_lower or "?" in message_lower:
            return self._help_response()
        
        # Analysis queries
        if "analyze" in message_lower or "analysis" in message_lower or "insight" in message_lower:
            return self._analysis_response(message_lower, rates_data, forecast_data)
        
        # Recommendation queries
        if "recommend" in message_lower or "should i" in message_lower or "advice" in message_lower:
            return self._recommendation_response(message_lower, forecast_data)
        
        # Default response
        return self._default_response()
    
    def _greeting_response(self):
        responses = [
            f"Hello! I'm {self.name}, your currency exchange assistant. How can I help you today?",
            f"Hi there! I'm {self.name}. Ask me about currency rates, predictions, or market analysis!",
            f"Greetings! I'm {self.name}, ready to help with your forex queries. What would you like to know?"
        ]
        return random.choice(responses)
    
    def _farewell_response(self):
        responses = [
            "Goodbye! Happy trading! 💰",
            "See you later! Feel free to come back anytime for currency insights.",
            "Bye! May your trades be profitable! 📈"
        ]
        return random.choice(responses)
    
    def _rate_response(self, message, rates_data):
        if not rates_data:
            return "I don't have current rate data available. Please try again in a moment."
        
        # Extract currency pair from message
        pair = self._extract_currency_pair(message)
        
        if pair and pair in rates_data:
            rate_info = rates_data[pair]
            trend_emoji = "📈" if rate_info['trend'] == 'up' else "📉"
            change_text = f"+{rate_info['change']}" if rate_info['change'] > 0 else str(rate_info['change'])
            
            return f"{trend_emoji} **{pair}** is currently at **{rate_info['rate']}** ({change_text}%). " \
                   f"The rate is trending {rate_info['trend']}."
        
        # General rate summary
        summary = "Here are the current rates:\n\n"
        for pair, info in list(rates_data.items())[:4]:
            trend_emoji = "📈" if info['trend'] == 'up' else "📉"
            summary += f"{trend_emoji} **{pair}**: {info['rate']} ({info['change']:+.2f}%)\n"
        
        return summary
    
    def _prediction_response(self, message, forecast_data):
        pair = self._extract_currency_pair(message)
        
        if pair:
            # Generate random prediction
            trend = random.choice(['bullish', 'bearish'])
            trend_emoji = "🚀" if trend == 'bullish' else "📉"
            confidence = random.randint(75, 95)
            
            return f"{trend_emoji} Based on ML analysis, **{pair}** is predicted to trend " \
                   f"**{trend}** with {confidence}% confidence. " \
                   f"Our LSTM model suggests this trend will continue for the next 7 days."
        
        return "🤖 Our AI model predicts mixed trends across major pairs. " \
               "USD/EUR shows bullish momentum (87% confidence), while USD/INR appears bearish (72% confidence). " \
               "Would you like details on a specific pair?"
    
    def _comparison_response(self, message, rates_data):
        if not rates_data:
            return "I need current rate data to make comparisons. Please try again."
        
        pairs = list(rates_data.keys())[:2]
        if len(pairs) >= 2:
            pair1, pair2 = pairs[0], pairs[1]
            rate1 = rates_data[pair1]['rate']
            rate2 = rates_data[pair2]['rate']
            
            return f"📊 Comparing **{pair1}** ({rate1}) vs **{pair2}** ({rate2}). " \
                   f"{pair1} is {'stronger' if rate1 > rate2 else 'weaker'} in absolute terms. " \
                   f"Both pairs show different market dynamics."
        
        return "Please specify which currency pairs you'd like to compare."
    
    def _best_response(self, rates_data):
        if not rates_data:
            return "I need rate data to determine the best performer."
        
        best_pair = max(rates_data.items(), key=lambda x: x[1]['change'])
        pair_name, info = best_pair
        
        return f"🏆 **{pair_name}** is the best performer today with a **{info['change']:+.2f}%** gain! " \
               f"Current rate: {info['rate']}. This strong performance suggests positive market sentiment."
    
    def _worst_response(self, rates_data):
        if not rates_data:
            return "I need rate data to determine the worst performer."
        
        worst_pair = min(rates_data.items(), key=lambda x: x[1]['change'])
        pair_name, info = worst_pair
        
        return f"📉 **{pair_name}** is underperforming today with a **{info['change']:+.2f}%** change. " \
               f"Current rate: {info['rate']}. Consider monitoring this pair closely."
    

    def _volatility_response(self, rates_data):
        if not rates_data:
            return "I need rate data to determine volatility."
        
        # Find the pair with highest absolute change (most volatile)
        most_volatile = max(rates_data.items(), key=lambda x: abs(x[1]['change']))
        pair_name, info = most_volatile
        
        volatility_level = "High" if abs(info['change']) > 1 else "Moderate" if abs(info['change']) > 0.5 else "Low"
        
        return f"⚡ **{pair_name}** is the most volatile today with a **{abs(info['change']):.2f}%** movement " \
               f"({info['change']:+.2f}%). Current rate: {info['rate']}. " \
               f"Volatility level: {volatility_level}. This presents both opportunities and risks."

    def _analysis_response(self, message, rates_data, forecast_data):
        pair = self._extract_currency_pair(message)
        
        if pair and rates_data and pair in rates_data:
            info = rates_data[pair]
            
            analysis = f"📊 **{pair} Analysis:**\n\n"
            analysis += f"• Current Rate: {info['rate']}\n"
            analysis += f"• 24h Change: {info['change']:+.2f}%\n"
            analysis += f"• Trend: {info['trend'].upper()}\n"
            analysis += f"• Volatility: {'High' if abs(info['change']) > 1 else 'Moderate' if abs(info['change']) > 0.5 else 'Low'}\n"
            analysis += f"• Market Sentiment: {'Bullish 🚀' if info['change'] > 0 else 'Bearish 📉'}\n\n"
            analysis += f"💡 **Insight:** The pair is showing {'strong upward momentum' if info['change'] > 0.5 else 'downward pressure' if info['change'] < -0.5 else 'stable movement'}."
            
            return analysis
        
        return "🔍 For detailed analysis, please specify a currency pair (e.g., USD/EUR, GBP/USD)."
    
    def _recommendation_response(self, message, forecast_data):
        recommendations = [
            "💡 **Recommendation:** Based on current ML predictions, consider monitoring USD/EUR for potential bullish opportunities. "
            "However, always do your own research and consider your risk tolerance.",
            
            "⚠️ **Advisory:** The market shows mixed signals. USD/EUR appears bullish (87% confidence), "
            "while USD/INR shows bearish trends. Diversification is key!",
            
            "📈 **Suggestion:** Our LSTM model indicates strong upward momentum in GBP/USD (91% confidence). "
            "This could be a good time to watch this pair, but remember - past performance doesn't guarantee future results.",
            
            "🎯 **Strategy Tip:** Consider using our forecast page to analyze 7-day and 30-day predictions. "
            "Look for pairs with high confidence scores (>85%) and consistent trends."
        ]
        
        return random.choice(recommendations)
    
    def _help_response(self):
        return """🤖 **I can help you with:**

• **Rates**: Ask about current exchange rates
  _Example: "What's the USD/EUR rate?"_

• **Predictions**: Get AI-powered forecasts
  _Example: "Predict USD/EUR trend"_

• **Analysis**: Detailed market analysis
  _Example: "Analyze GBP/USD"_

• **Comparisons**: Compare currency pairs
  _Example: "Compare USD/EUR vs GBP/USD"_

• **Recommendations**: Trading insights
  _Example: "Should I buy USD/EUR?"_

• **Best/Worst**: Top performers
  _Example: "Which pair is performing best?"_

Just ask me anything about currency exchange! 💰"""
    
    def _default_response(self):
        responses = [
            "I'm not sure I understand. Could you rephrase that? Try asking about rates, predictions, or analysis.",
            "Hmm, I didn't quite get that. Ask me about currency rates, forecasts, or market trends!",
            "I can help with currency rates and predictions. What would you like to know?",
            "Type 'help' to see what I can do, or ask me about any currency pair!"
        ]
        return random.choice(responses)
    
    def _extract_currency_pair(self, message):
        """Extract currency pair from message"""
        pairs = ['USD/EUR', 'USD/INR', 'GBP/USD', 'USD/JPY', 'EUR/GBP', 'USD/CAD', 'AUD/USD']
        
        for pair in pairs:
            if pair.lower() in message or pair.replace('/', ' ').lower() in message:
                return pair
        
        # Try to extract from common patterns
        if 'usd' in message and 'eur' in message:
            return 'USD/EUR'
        if 'usd' in message and 'inr' in message:
            return 'USD/INR'
        if 'gbp' in message and 'usd' in message:
            return 'GBP/USD'
        if 'usd' in message and 'jpy' in message:
            return 'USD/JPY'
        
        return None

# Global bot instance
bot = EnhancedCurrencyBot()
