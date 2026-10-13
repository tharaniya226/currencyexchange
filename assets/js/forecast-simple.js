// Simple Forecast Page Script
console.log('Forecast script loaded');

let currentPair = 'USD/EUR';
let currentDays = 7;
let forecastChart = null;

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing forecast page');
    
    const chartCanvas = document.getElementById('forecastChart');
    if (!chartCanvas) {
        console.error('Chart canvas not found!');
        return;
    }
    
    // Load initial forecast
    loadForecast();
    
    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    const currencySelect = document.getElementById('currencySelect');
    const timeRange = document.getElementById('timeRange');
    const updateBtn = document.querySelector('.btn-primary');
    
    if (currencySelect) {
        currencySelect.addEventListener('change', function(e) {
            currentPair = e.target.value;
            console.log('Currency changed to:', currentPair);
            loadForecast();
        });
    }
    
    if (timeRange) {
        timeRange.addEventListener('change', function(e) {
            currentDays = parseInt(e.target.value);
            console.log('Time range changed to:', currentDays);
            loadForecast();
        });
    }
    
    if (updateBtn) {
        updateBtn.addEventListener('click', function() {
            console.log('Update button clicked');
            loadForecast();
        });
    }
}

async function loadForecast() {
    console.log(`Loading forecast for ${currentPair}, ${currentDays} days`);
    
    try {
        // Show loading message
        showLoading();
        
        // Fetch data from API
        const historicalUrl = `http://localhost:5000/api/historical/${currentPair}?days=${currentDays}`;
        const forecastUrl = `http://localhost:5000/api/forecast/${currentPair}?days=${currentDays}`;
        
        console.log('Fetching:', historicalUrl);
        console.log('Fetching:', forecastUrl);
        
        const [historicalResponse, forecastResponse] = await Promise.all([
            fetch(historicalUrl),
            fetch(forecastUrl)
        ]);
        
        if (!historicalResponse.ok || !forecastResponse.ok) {
            throw new Error('API request failed');
        }
        
        const historical = await historicalResponse.json();
        const forecast = await forecastResponse.json();
        
        console.log('Historical data:', historical);
        console.log('Forecast data:', forecast);
        
        // Render chart
        renderChart(historical, forecast);
        
        // Update info
        updateInfo(forecast);
        
    } catch (error) {
        console.error('Error loading forecast:', error);
        showError(error.message);
    }
}

function renderChart(historical, forecast) {
    const ctx = document.getElementById('forecastChart').getContext('2d');
    
    // Prepare labels
    const historicalLabels = historical.data.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const forecastLabels = forecast.predictions.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const allLabels = [...historicalLabels, ...forecastLabels];
    
    // Prepare data
    const historicalRates = historical.data.map(d => d.rate);
    const forecastRates = forecast.predictions.map(d => d.predicted_rate);
    const upperBounds = forecast.predictions.map(d => d.upper_confidence);
    const lowerBounds = forecast.predictions.map(d => d.lower_confidence);
    
    // Combine data (historical + null for forecast, then null for historical + forecast)
    const historicalData = [...historicalRates, ...new Array(forecastRates.length).fill(null)];
    const forecastData = [...new Array(historicalRates.length).fill(null), ...forecastRates];
    const upperData = [...new Array(historicalRates.length).fill(null), ...upperBounds];
    const lowerData = [...new Array(historicalRates.length).fill(null), ...lowerBounds];
    
    // Destroy existing chart
    if (forecastChart) {
        forecastChart.destroy();
    }
    
    // Create new chart
    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: allLabels,
            datasets: [
                {
                    label: 'Historical Data',
                    data: historicalData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Predicted Trend',
                    data: forecastData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Upper Confidence',
                    data: upperData,
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                    borderWidth: 1,
                    borderDash: [2, 2],
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Lower Confidence',
                    data: lowerData,
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                    borderWidth: 1,
                    borderDash: [2, 2],
                    fill: false,
                    pointRadius: 0
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
                        font: { family: 'Inter', size: 12 },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
                }
            }
        }
    });
    
    console.log('Chart rendered successfully');
}

function updateInfo(forecast) {
    const insightText = document.querySelector('.bg-accent-blue p');
    if (insightText) {
        const trendClass = forecast.trend === 'bullish' ? 'text-accent-green' : 'text-red-400';
        insightText.innerHTML = `
            Based on historical patterns and current market conditions, the model predicts a 
            <span class="${trendClass} font-semibold">${forecast.trend} trend</span> for ${forecast.pair} 
            over the next ${forecast.predictions.length} days with ${forecast.confidence}% confidence.
        `;
    }
}

function showLoading() {
    const chartContainer = document.getElementById('forecastChart').parentElement;
    chartContainer.style.opacity = '0.5';
}

function showError(message) {
    const chartContainer = document.getElementById('forecastChart').parentElement;
    chartContainer.innerHTML = `
        <div class="text-center py-12">
            <i class="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
            <p class="text-red-400 text-lg">Error loading forecast</p>
            <p class="text-gray-400 text-sm mt-2">${message}</p>
            <button onclick="location.reload()" class="btn-primary mt-4">
                <i class="fas fa-sync-alt mr-2"></i> Retry
            </button>
        </div>
    `;
}
