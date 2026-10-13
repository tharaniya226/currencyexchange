// Cinematic Forex Splash Screen Animation
// ForexCast - Premium Trading Platform

// Configuration
const SPLASH_DURATION = 5000;
const REDIRECT_URL = 'login.html';

// Currency symbols
const currencies = [
    { symbol: '$', size: 1.2 },
    { symbol: '€', size: 1.1 },
    { symbol: '¥', size: 1.0 },
    { symbol: '£', size: 1.0 },
    { symbol: '₹', size: 0.9 },
    { symbol: '₿', size: 1.1 },
    { symbol: '$', size: 0.8 },
    { symbol: '€', size: 0.9 },
    { symbol: '¥', size: 1.0 },
    { symbol: '£', size: 0.8 },
    { symbol: '₹', size: 1.0 },
    { symbol: '₿', size: 0.9 }
];

// State
let hasTransitioned = false;
let symbolElements = [];

// Create explosion effect
function createExplosion() {
    const container = document.getElementById('symbolsContainer');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    currencies.forEach((currency, index) => {
        const symbol = document.createElement('div');
        symbol.className = 'currency-symbol exploding';
        symbol.textContent = currency.symbol;
        symbol.setAttribute('data-symbol', currency.symbol);
        
        // Calculate explosion direction
        const angle = (Math.PI * 2 * index) / currencies.length + (Math.random() - 0.5) * 0.5;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rotation = (Math.random() - 0.5) * 720;
        const scale = currency.size * (0.8 + Math.random() * 0.4);
        
        // Set CSS variables
        symbol.style.setProperty('--tx', `${tx}px`);
        symbol.style.setProperty('--ty', `${ty}px`);
        symbol.style.setProperty('--rotation', `${rotation}deg`);
        symbol.style.setProperty('--scale', scale);
        symbol.style.fontSize = `${4 * currency.size}rem`;
        
        // Position at center
        symbol.style.left = centerX + 'px';
        symbol.style.top = centerY + 'px';
        symbol.style.transform = 'translate(-50%, -50%)';
        
        // Add floating variables for later
        symbol.style.setProperty('--float-x', `${(Math.random() - 0.5) * 40}px`);
        symbol.style.setProperty('--float-y', `${(Math.random() - 0.5) * 40}px`);
        
        container.appendChild(symbol);
        symbolElements.push(symbol);
        
        // Create sparks
        createSparks(centerX, centerY, angle);
    });
}

// Create spark particles
function createSparks(x, y, baseAngle) {
    const container = document.getElementById('sparksContainer');
    const sparkCount = 8;
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        const angle = baseAngle + (Math.random() - 0.5) * 0.8;
        const distance = 50 + Math.random() * 100;
        const sx = Math.cos(angle) * distance;
        const sy = Math.sin(angle) * distance;
        
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.setProperty('--sx', `${sx}px`);
        spark.style.setProperty('--sy', `${sy}px`);
        spark.style.animationDelay = `${Math.random() * 0.2}s`;
        
        container.appendChild(spark);
        
        setTimeout(() => spark.remove(), 1000);
    }
}

// Start floating animation
function startFloating() {
    symbolElements.forEach(symbol => {
        symbol.classList.remove('exploding');
        symbol.classList.add('floating');
    });
}

// Reveal FOREX text
function revealText() {
    const forexText = document.getElementById('forexText');
    forexText.classList.add('revealed');
}

// Start orbiting animation
function startOrbiting() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    symbolElements.forEach((symbol, index) => {
        symbol.classList.remove('floating');
        symbol.classList.add('orbiting');
        
        const orbitRadius = 300 + (index % 3) * 50;
        const startAngle = (360 / symbolElements.length) * index;
        
        symbol.style.setProperty('--orbit-radius', `${orbitRadius}px`);
        symbol.style.left = centerX + 'px';
        symbol.style.top = centerY + 'px';
        symbol.style.animationDelay = `${-startAngle / 360 * 20}s`;
    });
}

// Transition to login
async function transitionToLogin() {
    if (hasTransitioned) return;
    hasTransitioned = true;

    const splashContainer = document.getElementById('splashContainer');
    
    // Collapse symbols
    splashContainer.classList.add('collapsing');
    
    await sleep(400);
    
    // Create light burst
    const burst = document.createElement('div');
    burst.className = 'light-burst';
    splashContainer.appendChild(burst);
    
    await sleep(400);
    
    // Fade out
    splashContainer.classList.add('fade-out');
    
    await sleep(600);
    
    // Redirect
    window.location.href = REDIRECT_URL;
}

// Utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Animation sequence
async function runAnimationSequence() {
    // Wait for initial blur
    await sleep(800);
    
    // Create explosion
    createExplosion();
    
    // Wait for explosion to complete
    await sleep(1200);
    
    // Start floating
    startFloating();
    
    // Reveal text
    await sleep(300);
    revealText();
    
    // Start orbiting
    await sleep(800);
    startOrbiting();
    
    // Auto transition
    setTimeout(transitionToLogin, SPLASH_DURATION - 3300);
}

// Initialize
function init() {
    // Start animation sequence
    runAnimationSequence();
    
    // Click to skip
    document.getElementById('splashContainer').addEventListener('click', transitionToLogin);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            transitionToLogin();
        }
    });
    
    // Preload login page
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = REDIRECT_URL;
    document.head.appendChild(link);
}

// Start
init();
