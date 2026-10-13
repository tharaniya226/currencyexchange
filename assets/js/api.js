// ===== API Service =====
// Handles all backend API communications

const API_BASE_URL = 'http://localhost:5000/api';

class APIService {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    // Generic fetch wrapper
    async fetch(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Get all currency rates
    async getAllRates() {
        return await this.fetch('/rates');
    }

    // Get specific currency rate
    async getRate(pair) {
        return await this.fetch(`/rates/${pair}`);
    }

    // Get historical data
    async getHistoricalData(pair, days = 7) {
        return await this.fetch(`/historical/${pair}?days=${days}`);
    }

    // Get forecast/prediction
    async getForecast(pair, days = 7) {
        return await this.fetch(`/forecast/${pair}?days=${days}`);
    }

    // Get market news
    async getNews() {
        return await this.fetch('/news');
    }

    // Get active alerts
    async getAlerts() {
        return await this.fetch('/alerts');
    }

    // Get system statistics
    async getStats() {
        return await this.fetch('/stats');
    }
}

// Create global API instance
const api = new APIService();

// Export for use in other files
if (typeof window !== 'undefined') {
    window.api = api;
}
