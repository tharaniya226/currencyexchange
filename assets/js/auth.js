// Authentication System for ForexCast

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('forexcast_user') !== null || 
           sessionStorage.getItem('forexcast_user') !== null;
}

// Get logged in user
function getLoggedInUser() {
    return localStorage.getItem('forexcast_user') || 
           sessionStorage.getItem('forexcast_user');
}

// Logout function
function logout() {
    localStorage.removeItem('forexcast_user');
    sessionStorage.removeItem('forexcast_user');
    window.location.href = 'login.html';
}

// Protect pages - redirect to login if not authenticated
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// Redirect to dashboard if already logged in (for login page)
function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = 'index.html';
    }
}

// Initialize auth on page load
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isLoggedIn,
        getLoggedInUser,
        logout,
        requireAuth,
        redirectIfLoggedIn
    };
}
