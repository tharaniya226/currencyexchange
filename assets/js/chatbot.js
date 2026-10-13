// AI Chatbot Widget
class ChatbotWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }
    
    init() {
        this.createWidget();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }
    
    createWidget() {
        const widget = document.createElement('div');
        widget.innerHTML = `
            <!-- Chat Button -->
            <button id="chatbot-button" class="chatbot-button">
                <i class="fas fa-comments"></i>
                <span class="chat-badge">AI</span>
            </button>
            
            <!-- Chat Window -->
            <div id="chatbot-window" class="chatbot-window">
                <div class="chatbot-header">
                    <div class="flex items-center space-x-2">
                        <div class="chatbot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold text-white">ForexBot</h3>
                            <p class="text-xs text-gray-400">AI Currency Assistant</p>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Messages will be added here -->
                </div>
                
                <div class="chatbot-input-container">
                    <input 
                        type="text" 
                        id="chatbot-input" 
                        class="chatbot-input" 
                        placeholder="Ask about rates, predictions..."
                        autocomplete="off"
                    />
                    <button id="chatbot-send" class="chatbot-send">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                
                <div class="chatbot-suggestions">
                    <button class="suggestion-btn" data-message="What's the USD/EUR rate?">
                        💱 Current Rates
                    </button>
                    <button class="suggestion-btn" data-message="Predict USD/EUR trend">
                        📈 Predictions
                    </button>
                    <button class="suggestion-btn" data-message="Analyze GBP/USD">
                        🔍 Analysis
                    </button>
                    <button class="suggestion-btn" data-message="Help">
                        ❓ Help
                    </button>
                </div>
                
                <div class="chatbot-footer">
                    Powered by <a href="#" target="_blank">AI Assistant</a> • Currency Data API
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }
    
    attachEventListeners() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');
        const suggestions = document.querySelectorAll('.suggestion-btn');
        
        button.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                input.value = message;
                this.sendMessage();
            });
        });
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        if (this.isOpen) {
            window.classList.add('active');
            button.style.display = 'none';
        } else {
            window.classList.remove('active');
            button.style.display = 'flex';
        }
    }
    
    addWelcomeMessage() {
        this.addBotMessage(
            "👋 Hi! I'm ForexBot, your AI currency assistant. Ask me about rates, predictions, or market analysis!"
        );
    }
    
    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addUserMessage(message);
        input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        try {
            // Send to backend
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            if (!response.ok) {
                throw new Error('Failed to get response');
            }
            
            const data = await response.json();
            
            // Remove typing indicator
            this.hideTyping();
            
            // Add bot response
            this.addBotMessage(data.response);
            
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTyping();
            this.addBotMessage(
                "Sorry, I'm having trouble connecting. Please make sure the backend is running."
            );
        }
    }
    
    addUserMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-content user-content">
                ${this.escapeHtml(text)}
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(text) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        
        // Convert markdown-style bold to HTML
        const formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = `
            <div class="bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content bot-content">
                ${formattedText}
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'chat-message bot-message';
        typingDiv.innerHTML = `
            <div class="bot-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content bot-content typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatbotWidget();
});
