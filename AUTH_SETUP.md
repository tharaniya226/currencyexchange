# 🔐 Authentication System Setup

## Overview
Your ForexCast application now has a complete authentication system with login protection.

## How It Works

### 1. Entry Point
When users visit your site, they should start at:
```
http://localhost:8000/login.html
```

### 2. Login Flow
1. User enters email and password
2. Click "Sign In"
3. Credentials are validated (currently accepts any email/password)
4. User is redirected to dashboard (index.html)
5. Session is stored in browser

### 3. Protected Pages
All main pages now require authentication:
- Dashboard (index.html)
- Forecast (forecast.html)
- News (news.html)
- Geo Alerts (geo-alerts.html)
- Alerts (alerts.html)

If a user tries to access these pages without logging in, they'll be redirected to login.html

### 4. Logout
Users can logout by clicking the "Logout" button in the navbar (top-right corner)

## Files Created/Modified

### New Files:
1. **assets/js/auth.js** - Authentication logic
2. **welcome.html** - Auto-redirects to login
3. **AUTH_SETUP.md** - This guide

### Modified Files:
1. **login.html** - Enhanced with auth system
2. **index.html** - Added auth protection + logout button

## Testing the System

### Test Login:
1. Open: http://localhost:8000/login.html
2. Enter any email (e.g., user@example.com)
3. Enter any password (e.g., password123)
4. Check "Remember me" if you want to stay logged in
5. Click "Sign In"
6. You'll be redirected to the dashboard

### Test Protection:
1. Open: http://localhost:8000/index.html (without logging in)
2. You'll be automatically redirected to login.html
3. After logging in, you can access all pages

### Test Logout:
1. Click the "Logout" button in the navbar
2. You'll be redirected to login.html
3. Try accessing index.html - you'll be redirected back to login

## Session Storage

### Remember Me (Checked):
- Stored in `localStorage`
- Persists even after closing browser
- User stays logged in

### Remember Me (Unchecked):
- Stored in `sessionStorage`
- Cleared when browser tab is closed
- User must login again

## Customization

### Change Default Redirect:
Edit `assets/js/auth.js`:
```javascript
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html'; // Change this
    }
}
```

### Add Real Authentication:
Replace the login logic in `login.html` with actual API calls:
```javascript
// Current (mock):
setTimeout(() => {
    // Store login state
    if (remember) {
        localStorage.setItem('forexcast_user', email);
    }
}, 1500);

// Replace with:
const response = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});

if (response.ok) {
    const data = await response.json();
    if (remember) {
        localStorage.setItem('forexcast_user', data.token);
    }
}
```

## Adding Auth to Other Pages

To protect additional pages, add these two lines after `<body>` tag:

```html
<script src="assets/js/auth.js"></script>
<script>requireAuth();</script>
```

## Adding Logout Button to Other Pages

Add to navbar (desktop):
```html
<button onclick="logout()" class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm">
    <i class="fas fa-sign-out-alt mr-2"></i>Logout
</button>
```

Add to mobile menu:
```html
<button onclick="logout()" class="mobile-link bg-red-500 hover:bg-red-600 text-white text-center">
    <i class="fas fa-sign-out-alt mr-2"></i>Logout
</button>
```

## Current Status

✅ Login page created
✅ Authentication system implemented
✅ Dashboard protected
✅ Logout functionality added
✅ Session management working
⏳ Other pages need auth protection (forecast, news, geo-alerts, alerts)
⏳ Backend API integration (optional)

## Next Steps

### Option 1: Protect All Pages
Add auth protection to:
- forecast.html
- news.html
- geo-alerts.html
- alerts.html

### Option 2: Add Backend Authentication
Create a backend endpoint:
```python
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Validate credentials
    if validate_user(email, password):
        token = generate_token(email)
        return jsonify({'token': token, 'user': email})
    
    return jsonify({'error': 'Invalid credentials'}), 401
```

### Option 3: Add User Registration
Create a signup page similar to login.html

## Security Notes

⚠️ **Current Implementation:**
- Accepts any email/password (for demo purposes)
- Stores email in browser storage (not secure for production)
- No password encryption
- No token expiration

🔒 **For Production:**
- Implement real user database
- Use JWT tokens
- Hash passwords (bcrypt)
- Add HTTPS
- Implement token expiration
- Add CSRF protection
- Use secure cookies

## Troubleshooting

### Issue: Redirected to login immediately after logging in
**Solution:** Clear browser storage
```javascript
// In browser console:
localStorage.clear();
sessionStorage.clear();
```

### Issue: Can't access pages
**Solution:** Make sure you're logged in first at login.html

### Issue: Logout button not working
**Solution:** Make sure auth.js is loaded before calling logout()

## Demo Credentials

Since this is a demo, any credentials work:
- Email: anything@example.com
- Password: anything

For production, implement real authentication!
