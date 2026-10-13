// ===== Toggle Switch Handlers =====
const toggleSwitches = document.querySelectorAll('.toggle-switch input');

toggleSwitches.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
        const alertType = e.target.parentElement.parentElement.querySelector('h3').textContent;
        const isEnabled = e.target.checked;
        
        console.log(`${alertType}: ${isEnabled ? 'Enabled' : 'Disabled'}`);
        
        // Show confirmation
        showAlertPopup(`${alertType} ${isEnabled ? 'enabled' : 'disabled'}`);
    });
});

// ===== Alert Popup Animation =====
function showAlertPopup(message) {
    const popup = document.getElementById('alertPopup');
    if (popup) {
        // Update message
        const messageElement = popup.querySelector('p');
        if (messageElement) {
            messageElement.textContent = message;
        }
        
        // Show popup
        popup.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 3000);
    }
}

// ===== Simulate Random Alert =====
function simulateRandomAlert() {
    const alerts = [
        'USD/EUR rate changed by +0.8%',
        'High volatility detected in GBP/USD',
        'New prediction update available',
        'Market news: Federal Reserve announcement'
    ];
    
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    showAlertPopup(randomAlert);
}

// Show a random alert every 30 seconds (for demo purposes)
setInterval(simulateRandomAlert, 30000);

// ===== Notification Click Handler =====
const notifications = document.querySelectorAll('.notification-item');

notifications.forEach(notification => {
    notification.addEventListener('click', () => {
        notification.style.opacity = '0.6';
        setTimeout(() => {
            notification.style.transition = 'opacity 0.3s ease';
            notification.style.opacity = '1';
        }, 200);
    });
});

// ===== Mark Notification as Read =====
function markAsRead(notificationElement) {
    notificationElement.style.opacity = '0.5';
    notificationElement.style.pointerEvents = 'none';
}
