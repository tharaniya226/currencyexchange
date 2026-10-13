with open('backend/chatbot.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the greeting check with word boundary logic
old_greeting = '''        # Greetings
        if any(greeting in message_lower for greeting in self.greetings):
            return self._greeting_response()'''

new_greeting = '''        # Greetings (use word boundaries to avoid false matches like "hi" in "which")
        greeting_words = message_lower.split()
        if any(greeting in greeting_words for greeting in self.greetings):
            return self._greeting_response()'''

content = content.replace(old_greeting, new_greeting)

# Also add volatility check if not present
if 'def _volatility_response' not in content:
    # Find where to insert volatility check
    volatility_check = '''        # Volatility queries
        if "volatile" in message_lower or "volatility" in message_lower:
            return self._volatility_response(rates_data)
        
'''
    # Insert after farewells
    content = content.replace(
        '''        # Farewells
        if any(farewell in message_lower for farewell in self.farewells):
            return self._farewell_response()
        
        # Rate queries''',
        '''        # Farewells
        if any(farewell in message_lower for farewell in self.farewells):
            return self._farewell_response()
        
        ''' + volatility_check + '''# Rate queries'''
    )
    
    # Add the volatility response method after _worst_response
    volatility_method = '''
    def _volatility_response(self, rates_data):
        if not rates_data:
            return "I need rate data to determine volatility."
        
        # Find the pair with highest absolute change (most volatile)
        most_volatile = max(rates_data.items(), key=lambda x: abs(x[1]['change']))
        pair_name, info = most_volatile
        
        volatility_level = "High" if abs(info['change']) > 1 else "Moderate" if abs(info['change']) > 0.5 else "Low"
        
        return f"⚡ **{pair_name}** is the most volatile today with a **{abs(info['change']):.2f}%** movement " \\
               f"({info['change']:+.2f}%). Current rate: {info['rate']}. " \\
               f"Volatility level: {volatility_level}. This presents both opportunities and risks."
'''
    
    content = content.replace(
        '''    def _analysis_response(self, message, rates_data, forecast_data):''',
        volatility_method + '''
    def _analysis_response(self, message, rates_data, forecast_data):'''
    )

with open('backend/chatbot.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed greeting logic and added volatility support!")
