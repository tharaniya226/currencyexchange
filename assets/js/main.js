// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ===== Currency Data =====
let currencyData = {};

// ===== Fetch Currency Rates from Backend =====
async function fetchCurrencyRates() {
    try {
        const rates = await api.getAllRates();
        currencyData = rates;
        updateCurrencyDisplay();
    } catch (error) {
        console.error('Failed to fetch rates:', error);
        // Fallback to dummy data if API fails
        useFallbackData();
    }
}

// ===== Update Currency Display =====
function updateCurrencyDisplay() {
    const cards = document.querySelectorAll('.currency-card');
    cards.forEach(card => {
        const pair = card.querySelector('h3').textContent;
        if (currencyData[pair]) {
            const data = currencyData[pair];
            
            // Update rate
            const rateElement = card.querySelector('.text-3xl');
            if (rateElement) {
                rateElement.textContent = data.rate.toFixed(2);
            }
            
            // Update change percentage
            const changeElement = card.querySelector('.text-sm');
            if (changeElement) {
                const isPositive = data.change >= 0;
                changeElement.className = `text-sm ${isPositive ? 'text-accent-green' : 'text-red-400'} flex items-center mt-1`;
                changeElement.innerHTML = `
                    <i class="fas fa-arrow-${isPositive ? 'up' : 'down'} mr-1"></i> 
                    ${isPositive ? '+' : ''}${data.change.toFixed(2)}%
                `;
            }
        }
    });
}

// ===== Fallback Data (if API is not available) =====
function useFallbackData() {
    currencyData = {
        'USD/EUR': { rate: 0.92, change: 0.45, trend: 'up' },
        'USD/INR': { rate: 83.24, change: -0.12, trend: 'down' },
        'GBP/USD': { rate: 1.27, change: 0.28, trend: 'up' },
        'USD/JPY': { rate: 149.82, change: 0.67, trend: 'up' }
    };
    updateCurrencyDisplay();
}

// ===== Fetch Stats from Backend =====
async function fetchStats() {
    try {
        const stats = await api.getStats();
        
        // Update stat cards
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 3) {
            statCards[0].querySelector('h3').textContent = stats.active_pairs;
            statCards[1].querySelector('h3').textContent = stats.prediction_accuracy + '%';
            statCards[2].querySelector('h3').textContent = stats.active_alerts;
        }
    } catch (error) {
        console.error('Failed to fetch stats:', error);
    }
}

// ===== Fetch Predictions from Backend =====
async function fetchPredictions() {
    try {
        const pairs = ['USD/EUR', 'USD/INR', 'GBP/USD'];
        const container = document.getElementById('predictions-container');
        
        if (!container) return;
        
        container.innerHTML = '<p class="text-gray-400">Loading predictions...</p>';
        
        const predictions = await Promise.all(
            pairs.map(pair => api.getForecast(pair, 1))
        );
        
        container.innerHTML = '';
        
        predictions.forEach(pred => {
            const isBullish = pred.trend === 'bullish';
            const color = isBullish ? 'green' : 'red';
            const icon = isBullish ? 'up' : 'down';
            
            const card = document.createElement('div');
            card.className = `prediction-card bg-${color}-500 bg-opacity-10 border border-${color}-500 border-opacity-30`;
            card.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="text-white font-semibold">${pred.pair}</span>
                    <i class="fas fa-arrow-${icon} text-${isBullish ? 'accent-green' : 'red-400'} text-xl"></i>
                </div>
                <p class="text-2xl font-bold text-${isBullish ? 'accent-green' : 'red-400'} mb-1">${pred.trend.charAt(0).toUpperCase() + pred.trend.slice(1)}</p>
                <p class="text-sm text-gray-400">Confidence: ${pred.confidence}%</p>
                <div class="progress-bar mt-3">
                    <div class="progress-fill ${isBullish ? '' : 'bg-red-400'}" style="width: ${pred.confidence}%"></div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Failed to fetch predictions:', error);
        const container = document.getElementById('predictions-container');
        if (container) {
            container.innerHTML = '<p class="text-red-400">Failed to load predictions</p>';
        }
    }
}

// ===== Initialize Dashboard =====
if (document.querySelector('.currency-card')) {
    // Initial fetch
    fetchCurrencyRates();
    fetchStats();
    fetchPredictions();
    
    // Update rates every 5 seconds
    setInterval(fetchCurrencyRates, 5000);
    
    // Update stats every 30 seconds
    setInterval(fetchStats, 30000);
    
    // Update predictions every 60 seconds
    setInterval(fetchPredictions, 60000);
}

// ===== Dashboard Chart =====
if (document.getElementById('trendChart')) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    let trendChart;
    
    // Fetch and render chart data
    async function loadChartData() {
        try {
            const usdEurData = await api.getHistoricalData('USD/EUR', 7);
            const gbpUsdData = await api.getHistoricalData('GBP/USD', 7);
            
            const labels = usdEurData.data.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
            });
            
            const usdEurRates = usdEurData.data.map(d => d.rate);
            const gbpUsdRates = gbpUsdData.data.map(d => d.rate);
            
            renderChart(labels, usdEurRates, gbpUsdRates);
        } catch (error) {
            console.error('Failed to load chart data:', error);
            // Fallback to dummy data
            const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const usdEurData = [0.91, 0.915, 0.92, 0.918, 0.922, 0.919, 0.92];
            const gbpUsdData = [1.25, 1.26, 1.265, 1.27, 1.268, 1.272, 1.27];
            renderChart(labels, usdEurData, gbpUsdData);
        }
    }
    
    function renderChart(labels, usdEurData, gbpUsdData) {
        if (trendChart) {
            trendChart.destroy();
        }
        
        trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'USD/EUR',
                        data: usdEurData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'GBP/USD',
                        data: gbpUsdData,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#fff',
                            font: {
                                family: 'Inter',
                                size: 12
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(59, 130, 246, 0.5)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#9ca3af',
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#9ca3af',
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }
    
    loadChartData();
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
