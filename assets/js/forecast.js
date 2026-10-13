// ===== Forecast Chart =====
if (document.getElementById('forecastChart')) {
    const ctx = document.getElementById('forecastChart').getContext('2d');
    let forecastChart;
    let currentPair = 'USD/EUR';
    let currentDays = 7;
    
    // Load forecast data from backend
    async function loadForecastData(pair, days) {
        try {
            console.log(`Loading forecast for ${pair}, ${days} days`);
            
            const historicalData = await api.getHistoricalData(pair, days);
            console.log('Historical data loaded:', historicalData);
            
            const forecastData = await api.getForecast(pair, days);
            console.log('Forecast data loaded:', forecastData);
            
            renderForecastChart(historicalData, forecastData);
            updatePredictionInfo(forecastData);
        } catch (error) {
            console.error('Failed to load forecast:', error);
            alert('Error loading forecast: ' + error.message);
            loadFallbackForecast();
        }
    }
    
    function renderForecastChart(historical, forecast) {
        const historicalLabels = historical.data.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const forecastLabels = forecast.predictions.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        
        const allLabels = [...historicalLabels, ...forecastLabels];
        
        const historicalRates = historical.data.map(d => d.rate);
        const predictedRates = new Array(historical.data.length).fill(null).concat(
            forecast.predictions.map(d => d.predicted_rate)
        );
        const upperBounds = new Array(historical.data.length).fill(null).concat(
            forecast.predictions.map(d => d.upper_confidence)
        );
        const lowerBounds = new Array(historical.data.length).fill(null).concat(
            forecast.predictions.map(d => d.lower_confidence)
        );
        
        if (forecastChart) {
            forecastChart.destroy();
        }
        
        forecastChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: allLabels,
                datasets: [
                    {
                        label: 'Historical Data',
                        data: [...historicalRates, ...new Array(forecast.predictions.length).fill(null)],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        borderWidth: 2
                    },
                    {
                        label: 'Predicted Trend',
                        data: predictedRates,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        borderWidth: 2,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'Upper Confidence',
                        data: upperBounds,
                        borderColor: 'rgba(16, 185, 129, 0.3)',
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        borderWidth: 1,
                        borderDash: [2, 2]
                    },
                    {
                        label: 'Lower Confidence',
                        data: lowerBounds,
                        borderColor: 'rgba(16, 185, 129, 0.3)',
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        fill: false,
                        pointRadius: 0,
                        borderWidth: 1,
                        borderDash: [2, 2]
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
    
    function updatePredictionInfo(forecast) {
        // Update AI insight text
        const insightText = document.querySelector('.bg-accent-blue p');
        if (insightText) {
            const trendText = forecast.trend === 'bullish' ? 
                '<span class="text-accent-green font-semibold">bullish trend</span>' :
                '<span class="text-red-400 font-semibold">bearish trend</span>';
            
            insightText.innerHTML = `
                Based on historical patterns and current market conditions, the model predicts a 
                ${trendText} for ${forecast.pair} 
                over the next ${forecast.predictions.length} days with ${forecast.confidence}% confidence.
            `;
        }
    }
    
    function loadFallbackForecast() {
        // Fallback dummy data
        const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10', 'Day 11'];
        const historicalData = [0.92, 0.918, 0.922, 0.919, 0.921, 0.923, 0.92];
        const predictedData = [null, null, null, null, null, null, 0.92, 0.925, 0.928, 0.93, 0.932];
        
        if (forecastChart) {
            forecastChart.destroy();
        }
        
        forecastChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Historical',
                    data: historicalData,
                    borderColor: '#3b82f6',
                    tension: 0.4
                }, {
                    label: 'Predicted',
                    data: predictedData,
                    borderColor: '#10b981',
                    borderDash: [5, 5],
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
    
    // Initial load
    loadForecastData(currentPair, currentDays);

    // ===== Currency Selection Handler =====
    const currencySelect = document.getElementById('currencySelect');
    const timeRange = document.getElementById('timeRange');
    const updateButton = document.querySelector('.btn-primary');

    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            currentPair = e.target.value;
            console.log('Selected currency pair:', currentPair);
            loadForecastData(currentPair, currentDays);
        });
    }

    if (timeRange) {
        timeRange.addEventListener('change', (e) => {
            currentDays = parseInt(e.target.value);
            console.log('Selected time range:', currentDays, 'days');
            loadForecastData(currentPair, currentDays);
        });
    }
    
    if (updateButton) {
        updateButton.addEventListener('click', () => {
            console.log('Update button clicked');
            loadForecastData(currentPair, currentDays);
        });
    }
}
