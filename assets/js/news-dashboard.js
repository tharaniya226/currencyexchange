// Forex News Dashboard - Interactive News Cards with Google Search Integration

// News Data Structure (Ready for API integration)
const newsData = [
    {
        id: 1,
        title: "Federal Reserve Signals Interest Rate Hike",
        summary: "The Federal Reserve indicated a potential 0.25% interest rate increase in the upcoming meeting, citing persistent inflation concerns. This move could strengthen the USD against major currencies.",
        country: "USA",
        countryFlag: "🇺🇸",
        impact: "bullish",
        currency: "USD",
        timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
        category: "Policy Change"
    },
    {
        id: 2,
        title: "ECB Maintains Current Interest Rates",
        summary: "The European Central Bank decided to keep interest rates unchanged at 4.5%, citing stabilizing inflation and economic recovery. The decision was in line with market expectations.",
        country: "Germany",
        countryFlag: "🇩🇪",
        impact: "neutral",
        currency: "EUR",
        timestamp: new Date(Date.now() - 5 * 3600000), // 5 hours ago
        category: "Policy Change"
    },
    {
        id: 3,
        title: "UK Inflation Falls Below Target",
        summary: "UK inflation dropped to 1.9%, falling below the Bank of England's 2% target for the first time in three years. This could lead to potential rate cuts and GBP weakness.",
        country: "UK",
        countryFlag: "🇬🇧",
        impact: "bearish",
        currency: "GBP",
        timestamp: new Date(Date.now() - 8 * 3600000), // 8 hours ago
        category: "Inflation"
    },
    {
        id: 4,
        title: "Japan GDP Growth Exceeds Expectations",
        summary: "Japan reported a 2.1% GDP growth rate for Q4, surpassing analyst predictions of 1.5%. The strong economic performance has led to JPY appreciation against major currencies.",
        country: "Japan",
        countryFlag: "🇯🇵",
        impact: "bullish",
        currency: "JPY",
        timestamp: new Date(Date.now() - 12 * 3600000), // 12 hours ago
        category: "Economy"
    },
    {
        id: 5,
        title: "China Manufacturing Data Shows Slowdown",
        summary: "China's manufacturing PMI fell to 49.2, indicating contraction in the sector. This raises concerns about economic growth and could weaken the CNY.",
        country: "China",
        countryFlag: "🇨🇳",
        impact: "bearish",
        currency: "CNY",
        timestamp: new Date(Date.now() - 18 * 3600000), // 18 hours ago
        category: "Economy"
    },
    {
        id: 6,
        title: "Australia Central Bank Holds Rates Steady",
        summary: "The Reserve Bank of Australia maintained its cash rate at 4.35%, balancing inflation concerns with economic growth. AUD remains stable against major currencies.",
        country: "Australia",
        countryFlag: "🇦🇺",
        impact: "neutral",
        currency: "AUD",
        timestamp: new Date(Date.now() - 24 * 3600000), // 1 day ago
        category: "Policy Change"
    },
    {
        id: 7,
        title: "Swiss Franc Strengthens on Safe Haven Demand",
        summary: "Geopolitical tensions have increased demand for safe-haven currencies, with the Swiss Franc gaining 1.2% against the Euro and Dollar.",
        country: "Switzerland",
        countryFlag: "🇨🇭",
        impact: "bullish",
        currency: "CHF",
        timestamp: new Date(Date.now() - 6 * 3600000), // 6 hours ago
        category: "Market Sentiment"
    },
    {
        id: 8,
        title: "Canadian Dollar Weakens on Oil Price Drop",
        summary: "Oil prices fell 3.5% following OPEC+ production increase announcement. The Canadian Dollar, closely tied to oil prices, weakened against major currencies.",
        country: "Canada",
        countryFlag: "🇨🇦",
        impact: "bearish",
        currency: "CAD",
        timestamp: new Date(Date.now() - 10 * 3600000), // 10 hours ago
        category: "Commodities"
    },
    {
        id: 9,
        title: "Indian Rupee Hits Record High",
        summary: "India's strong economic fundamentals and foreign investment inflows pushed the Rupee to a 5-year high against the US Dollar.",
        country: "India",
        countryFlag: "🇮🇳",
        impact: "bullish",
        currency: "INR",
        timestamp: new Date(Date.now() - 15 * 3600000), // 15 hours ago
        category: "Economy"
    }
];

// State Management
let currentFilter = 'all';
let displayedNews = [...newsData];

// Initialize Dashboard
function initDashboard() {
    renderNews(displayedNews);
    updateNewsCount();
    setupEventListeners();
}

// Render News Cards
function renderNews(newsArray) {
    const container = document.getElementById('newsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const emptyState = document.getElementById('emptyState');

    // Show loading
    loadingSpinner.classList.remove('hidden');
    container.innerHTML = '';

    // Simulate loading delay
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');

        if (newsArray.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');

        newsArray.forEach((news, index) => {
            const card = createNewsCard(news, index);
            container.appendChild(card);
        });
    }, 300);
}

// Create News Card Element
function createNewsCard(news, index) {
    const card = document.createElement('div');
    card.className = 'forex-news-card';
    card.style.animationDelay = `${index * 0.1}s`;
    card.onclick = () => openGoogleSearch(news.title);

    const impactClass = `impact-${news.impact}`;
    const impactIcon = news.impact === 'bullish' ? 'fa-arrow-up' : 
                       news.impact === 'bearish' ? 'fa-arrow-down' : 'fa-minus';

    card.innerHTML = `
        <div class="flex items-start space-x-4 mb-4">
            <div class="country-flag">
                ${news.countryFlag}
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold text-gray-400 uppercase tracking-wide">${news.country}</span>
                    <span class="impact-badge ${impactClass}">
                        <i class="fas ${impactIcon} mr-1"></i>${news.impact}
                    </span>
                </div>
                <h3 class="news-title">${news.title}</h3>
            </div>
        </div>
        
        <p class="news-summary">${news.summary}</p>
        
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <span class="text-xs text-gray-500">
                    <i class="fas fa-coins mr-1"></i>${news.currency}
                </span>
                <span class="text-xs text-gray-500">
                    <i class="far fa-clock mr-1"></i>${getTimeAgo(news.timestamp)}
                </span>
            </div>
            <div class="click-hint">
                <span>Click to search</span>
                <i class="fas fa-external-link-alt"></i>
            </div>
        </div>
    `;

    return card;
}

// Open Google Search in New Tab
function openGoogleSearch(newsTitle) {
    // Encode the search query properly
    const searchQuery = encodeURIComponent(`${newsTitle} forex impact`);
    const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}`;
    
    // Open in new tab
    window.open(googleSearchUrl, '_blank');
    
    // Optional: Show feedback
    showNotification('Opening Google Search...');
}

// Time Ago Helper
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

// Update News Count
function updateNewsCount() {
    document.getElementById('totalNewsCount').textContent = displayedNews.length;
}

// Filter News
function filterNews(filterType) {
    currentFilter = filterType;
    
    if (filterType === 'all') {
        displayedNews = [...newsData];
    } else {
        displayedNews = newsData.filter(news => news.impact === filterType);
    }
    
    renderNews(displayedNews);
    updateNewsCount();
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter news
            const filter = btn.getAttribute('data-filter');
            filterNews(filter);
        });
    });

    // Refresh button
    document.getElementById('refreshNews').addEventListener('click', () => {
        const btn = document.getElementById('refreshNews');
        const icon = btn.querySelector('i');
        
        // Add spin animation
        icon.classList.add('fa-spin');
        
        // Simulate refresh
        setTimeout(() => {
            icon.classList.remove('fa-spin');
            renderNews(displayedNews);
            showNotification('News refreshed successfully!');
        }, 1000);
    });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50';
    notification.style.animation = 'slideIn 0.3s ease';
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas fa-check-circle text-xl"></i>
            <span class="font-medium">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// API Integration Ready Function (for future use)
async function fetchNewsFromAPI() {
    try {
        // Example API call structure
        // const response = await fetch('http://localhost:5000/api/news');
        // const data = await response.json();
        // return data;
        
        // For now, return mock data
        return newsData;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDashboard);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDashboard,
        filterNews,
        openGoogleSearch,
        fetchNewsFromAPI
    };
}
