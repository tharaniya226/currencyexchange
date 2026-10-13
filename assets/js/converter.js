// Premium Currency Converter - Working Version v4.0
console.log('✅ Converter script loaded - Version 4.0');
console.log('🔄 Initializing currency converter...');

// Currency Data for Converter (renamed to avoid conflicts)
const converterCurrencyData = {
    USD: { 
        flag: '🇺🇸', symbol: '$', name: 'US Dollar', rate: 1,
        noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Cdefs%3E%3ClinearGradient id="usd-g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2385bb65"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%236b9e54"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="450" height="220" fill="url(%23usd-g)" rx="16"/%3E%3Ccircle cx="100" cy="110" r="55" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="3"/%3E%3Ctext x="100" y="120" font-family="Georgia,serif" font-size="45" font-weight="bold" fill="%23ffffff" text-anchor="middle" opacity="0.7"%3EB%3C/text%3E%3Crect x="12" y="12" width="426" height="196" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" rx="12"/%3E%3Ctext x="280" y="85" font-family="Georgia,serif" font-size="95" font-weight="bold" fill="%23ffffff" text-anchor="middle" opacity="0.95"%3E$%3C/text%3E%3Ctext x="280" y="155" font-family="Arial" font-size="32" font-weight="700" fill="%23ffffff" text-anchor="middle" opacity="0.9"%3E100 DOLLARS%3C/text%3E%3Ctext x="35" y="45" font-family="Arial" font-size="20" font-weight="bold" fill="%23ffffff" opacity="0.85"%3EUNITED STATES%3C/text%3E%3C/svg%3E'
    },
    EUR: { 
        flag: '🇪🇺', symbol: '€', name: 'Euro', rate: 0.92,
        noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Cdefs%3E%3ClinearGradient id="eur-g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234a90e2"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%232e5f8f"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="450" height="220" fill="url(%23eur-g)" rx="16"/%3E%3Crect x="70" y="60" width="50" height="100" rx="25" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/%3E%3Crect x="12" y="12" width="426" height="196" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" rx="12"/%3E%3Ctext x="280" y="85" font-family="Georgia,serif" font-size="95" font-weight="bold" fill="%23ffffff" text-anchor="middle" opacity="0.95"%3E€%3C/text%3E%3Ctext x="280" y="155" font-family="Arial" font-size="32" font-weight="700" fill="%23ffffff" text-anchor="middle" opacity="0.9"%3E100 EURO%3C/text%3E%3Ctext x="35" y="45" font-family="Arial" font-size="20" font-weight="bold" fill="%23ffffff" opacity="0.85"%3EEUROPEAN UNION%3C/text%3E%3C/svg%3E'
    },
    GBP: { 
        flag: '🇬🇧', symbol: '£', name: 'British Pound', rate: 0.79,
        noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Cdefs%3E%3ClinearGradient id="gbp-g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%239b59b6"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%237d3c98"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="450" height="220" fill="url(%23gbp-g)" rx="16"/%3E%3Ccircle cx="100" cy="110" r="50" fill="rgba(255,215,0,0.2)"/%3E%3Crect x="12" y="12" width="426" height="196" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" rx="12"/%3E%3Ctext x="280" y="85" font-family="Georgia,serif" font-size="95" font-weight="bold" fill="%23ffffff" text-anchor="middle" opacity="0.95"%3E£%3C/text%3E%3Ctext x="280" y="155" font-family="Arial" font-size="32" font-weight="700" fill="%23ffffff" text-anchor="middle" opacity="0.9"%3E100 POUNDS%3C/text%3E%3Ctext x="35" y="45" font-family="Arial" font-size="20" font-weight="bold" fill="%23ffffff" opacity="0.85"%3EBANK OF ENGLAND%3C/text%3E%3C/svg%3E'
    },
    JPY: { 
        flag: '🇯🇵', symbol: '¥', name: 'Japanese Yen', rate: 149.82,
        noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Cdefs%3E%3ClinearGradient id="jpy-g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23e74c3c"%3E%3C/stop%3E%3Cstop offset="100%25" style="stop-color:%23c0392b"%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="450" height="220" fill="url(%23jpy-g)" rx="16"/%3E%3Ccircle cx="375" cy="110" r="65" fill="rgba(255,255,255,0.2)"/%3E%3Crect x="12" y="12" width="426" height="196" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3" rx="12"/%3E%3Ctext x="250" y="85" font-family="Georgia,serif" font-size="95" font-weight="bold" fill="%23ffffff" text-anchor="middle" opacity="0.95"%3E¥%3C/text%3E%3Ctext x="250" y="155" font-family="Arial" font-size="32" font-weight="700" fill="%23ffffff" text-anchor="middle" opacity="0.9"%3E10000 YEN%3C/text%3E%3Ctext x="35" y="45" font-family="Arial" font-size="20" font-weight="bold" fill="%23ffffff" opacity="0.85"%3ENIPPON GINKO%3C/text%3E%3C/svg%3E'
    },
    CHF: { flag: '🇨🇭', symbol: 'Fr', name: 'Swiss Franc', rate: 0.88, noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Crect width="450" height="220" fill="%23e74c3c" rx="16"/%3E%3Ctext x="225" y="110" font-family="Georgia,serif" font-size="80" fill="%23fff" text-anchor="middle"%3EFr%3C/text%3E%3C/svg%3E' },
    CAD: { flag: '🇨🇦', symbol: 'C$', name: 'Canadian Dollar', rate: 1.35, noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Crect width="450" height="220" fill="%23e74c3c" rx="16"/%3E%3Ctext x="225" y="110" font-family="Georgia,serif" font-size="80" fill="%23fff" text-anchor="middle"%3EC$%3C/text%3E%3C/svg%3E' },
    AUD: { flag: '🇦🇺', symbol: 'A$', name: 'Australian Dollar', rate: 1.52, noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Crect width="450" height="220" fill="%233498db" rx="16"/%3E%3Ctext x="225" y="110" font-family="Georgia,serif" font-size="80" fill="%23fff" text-anchor="middle"%3EA$%3C/text%3E%3C/svg%3E' },
    CNY: { flag: '🇨🇳', symbol: '¥', name: 'Chinese Yuan', rate: 7.24, noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Crect width="450" height="220" fill="%23e74c3c" rx="16"/%3E%3Ctext x="225" y="110" font-family="Georgia,serif" font-size="80" fill="%23ffd700" text-anchor="middle"%3E¥%3C/text%3E%3C/svg%3E' },
    INR: { flag: '🇮🇳', symbol: '₹', name: 'Indian Rupee', rate: 83.24, noteImg: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="450" height="220"%3E%3Crect width="450" height="220" fill="%23ff9933" rx="16"/%3E%3Ctext x="225" y="110" font-family="Georgia,serif" font-size="80" fill="%23fff" text-anchor="middle"%3E₹%3C/text%3E%3C/svg%3E' }
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConverter);
} else {
    initConverter();
}

function initConverter() {
    console.log('🎯 Initializing converter...');
    console.log('📊 Currency data loaded:', Object.keys(converterCurrencyData));
    
    const fromAmount = document.getElementById('fromAmount');
    const toAmount = document.getElementById('toAmount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const swapButton = document.getElementById('swapButton');
    
    if (!fromAmount || !toAmount || !fromCurrency || !toCurrency) {
        console.error('❌ Required elements not found!');
        console.log('Elements check:', {
            fromAmount: !!fromAmount,
            toAmount: !!toAmount,
            fromCurrency: !!fromCurrency,
            toCurrency: !!toCurrency
        });
        return;
    }
    
    console.log('✅ All elements found, setting up...');
    
    // Initial update
    updateCurrencyNote();
    updateConversion();
    
    // Event listeners
    fromAmount.addEventListener('input', updateConversion);
    fromCurrency.addEventListener('change', function() {
        console.log('💱 FROM currency changed to:', this.value);
        updateCurrencyNote();
        updateConversion();
    });
    toCurrency.addEventListener('change', updateConversion);
    
    if (swapButton) {
        swapButton.addEventListener('click', handleSwap);
    }
    
    console.log('✅ Converter initialized successfully!');
}

function updateCurrencyNote() {
    const fromCurrency = document.getElementById('fromCurrency');
    const noteImage = document.getElementById('noteImage');
    const currencyNote = document.getElementById('currencyNote');
    
    if (!fromCurrency || !noteImage) {
        console.error('❌ Currency elements not found');
        return;
    }
    
    const currency = fromCurrency.value;
    console.log('🖼️ Updating note image to:', currency);
    
    if (converterCurrencyData[currency]) {
        // Add animation class
        if (currencyNote) {
            currencyNote.classList.add('changing');
        }
        
        setTimeout(() => {
            noteImage.src = converterCurrencyData[currency].noteImg;
            noteImage.alt = currency + ' Note';
            
            if (currencyNote) {
                currencyNote.classList.remove('changing');
                currencyNote.className = 'currency-note glow-' + currency.toLowerCase();
            }
            console.log('✅ Note image updated successfully');
        }, 400);
    }
}

function updateConversion() {
    const fromAmount = document.getElementById('fromAmount');
    const toAmount = document.getElementById('toAmount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const exchangeRate = document.getElementById('exchangeRate');
    const fromFlag = document.getElementById('fromFlag');
    const toFlag = document.getElementById('toFlag');
    
    if (!fromAmount || !toAmount || !fromCurrency || !toCurrency) return;
    
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(fromAmount.value) || 0;
    
    console.log('💰 Converting:', amount, from, 'to', to);
    
    // Calculate
    const fromRate = converterCurrencyData[from].rate;
    const toRate = converterCurrencyData[to].rate;
    const result = (amount / fromRate) * toRate;
    
    // Update
    toAmount.value = result.toFixed(2);
    
    if (fromFlag) fromFlag.textContent = converterCurrencyData[from].flag;
    if (toFlag) toFlag.textContent = converterCurrencyData[to].flag;
    
    if (exchangeRate) {
        const rate = (toRate / fromRate).toFixed(4);
        exchangeRate.textContent = `1 ${from} = ${rate} ${to}`;
    }
    
    console.log('✅ Conversion result:', result.toFixed(2), to);
}

function handleSwap() {
    console.log('🔄 Swapping currencies...');
    
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const currencyNote = document.getElementById('currencyNote');
    const swapButton = document.getElementById('swapButton');
    
    if (!fromCurrency || !toCurrency) return;
    
    // Add flip animation to note
    if (currencyNote) {
        currencyNote.classList.add('flipping');
        setTimeout(() => {
            currencyNote.classList.remove('flipping');
        }, 1400);
    }
    
    // Add rotation to swap button
    if (swapButton) {
        swapButton.classList.add('rotating', 'glowing');
        setTimeout(() => {
            swapButton.classList.remove('rotating', 'glowing');
        }, 600);
    }
    
    // Swap values
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    console.log('✅ Swapped:', fromCurrency.value, '↔️', toCurrency.value);
    
    // Update
    setTimeout(() => {
        updateCurrencyNote();
        updateConversion();
    }, 700);
}
