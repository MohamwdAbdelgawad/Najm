document.addEventListener('DOMContentLoaded', function() {
    // Initialize authentication system
    initAuth();
});

// Initialize authentication
function initAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            if (validateLoginForm(email, password)) {
                login(email, password, rememberMe);
            }
        });
    }
    
    // Register form handler
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const agreeTerms = document.getElementById('agree-terms').checked;
            
            if (validateRegisterForm(name, email, password, confirmPassword, agreeTerms)) {
                register(name, email, password);
            }
        });
    }
    
    // Check if user is already logged in
    checkAuthStatus();
}

// Validate login form
function validateLoginForm(email, password) {
    if (!email || !password) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return false;
    }
    
    if (!validateEmail(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    return true;
}

// Validate register form
function validateRegisterForm(name, email, password, confirmPassword, agreeTerms) {
    if (!name || !email || !password || !confirmPassword) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return false;
    }
    
    if (!validateEmail(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return false;
    }
    
    if (password.length < 6) {
        alert('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل');
        return false;
    }
    
    if (password !== confirmPassword) {
        alert('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
        return false;
    }
    
    if (!agreeTerms) {
        alert('يجب الموافقة على شروط الاستخدام وسياسة الخصوصية');
        return false;
    }
    
    return true;
}

// Login function
function login(email, password, rememberMe) {
    // In a real implementation, this would make an API call to authenticate the user
    // For this demo, we'll use localStorage to simulate authentication
    
    // Check if user exists in our "database"
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (user && user.password === password) { // In a real app, passwords would be hashed
        // Store user session
        const session = {
            userId: user.id,
            name: user.name,
            email: user.email,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('userSession', JSON.stringify(session));
        
        // Update UI
        updateAuthUI(true, user.name);
        
        // Close the modal
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (loginModal) {
            loginModal.hide();
        }
        
        // Show welcome message
        alert(`مرحباً بك ${user.name}! تم تسجيل دخولك بنجاح.`);
    } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
}

// Register function
function register(name, email, password) {
    // In a real implementation, this would make an API call to register the user
    // For this demo, we'll use localStorage to simulate user registration
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some(u => u.email === email);
    
    if (userExists) {
        alert('هذا البريد الإلكتروني مسجل بالفعل');
        return;
    }
    
    // Create new user
    const newUser = {
        id: generateUserId(),
        name,
        email,
        password, // In a real app, passwords would be hashed
        registrationDate: new Date().toISOString()
    };
    
    // Add to "database"
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log in the new user automatically
    login(email, password, false);
    
    // Close the modal
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (registerModal) {
        registerModal.hide();
    }
}

// Check authentication status
function checkAuthStatus() {
    const session = JSON.parse(localStorage.getItem('userSession') || 'null');
    
    if (session && session.isLoggedIn) {
        // User is logged in
        updateAuthUI(true, session.name);
    } else {
        // User is not logged in
        updateAuthUI(false);
    }
}

// Update authentication UI
function updateAuthUI(isLoggedIn, userName) {
    const authButtons = document.querySelector('.auth-buttons');
    
    if (authButtons) {
        if (isLoggedIn) {
            authButtons.innerHTML = `
                <div class="user-info">
                    <span class="user-greeting">مرحباً، ${userName}</span>
                    <button class="btn logout-btn" onclick="logout()">تسجيل الخروج</button>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="btn login-btn" data-bs-toggle="modal" data-bs-target="#loginModal">تسجيل الدخول</button>
                <button class="btn register-btn" data-bs-toggle="modal" data-bs-target="#registerModal">إنشاء حساب</button>
            `;
        }
    }
}

// Logout function
function logout() {
    // Clear the user session
    localStorage.removeItem('userSession');
    
    // Update UI
    updateAuthUI(false);
    
    // Refresh the page
    window.location.reload();
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Generate a random user ID
function generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Make logout function globally available
window.logout = logout;