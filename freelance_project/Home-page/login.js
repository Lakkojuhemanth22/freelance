document.addEventListener('DOMContentLoaded', () => {
    const showLoginBtn = document.getElementById('show-login');
    const showRegisterBtn = document.getElementById('show-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Show login form by default
    loginForm.classList.add('active');

    showLoginBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    showRegisterBtn.addEventListener('click', () => {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Handle Freelancer Login
    document.getElementById('freelancerLoginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const email = document.getElementById('freelancerEmail').value;
        const password = document.getElementById('freelancerPassword').value;

        try {
            const response = await fetch('/api/auth/login/freelancer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // Redirect to freelancer home page
                window.location.href = '/freelancer-home.html';
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Handle Freelancer Registration
    document.getElementById('freelancerRegisterForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('freelancerName').value;
        const email = document.getElementById('freelancerRegisterEmail').value;
        const password = document.getElementById('freelancerRegisterPassword').value;
        const confirmPassword = document.getElementById('freelancerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/api/auth/register/freelancer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                // Redirect to freelancer login page
                window.location.href = '/freelancer-login.html';
            } else {
                alert('Registration failed. Please check your details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Handle Company Login
    document.getElementById('companyLoginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('companyEmail').value;
        const password = document.getElementById('companyPassword').value;

        try {
            const response = await fetch('/api/auth/login/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // Redirect to company home page
                window.location.href = '/company-home.html';
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Handle Company Registration
    document.getElementById('companyRegisterForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const companyName = document.getElementById('companyName').value;
        const email = document.getElementById('companyRegisterEmail').value;
        const password = document.getElementById('companyRegisterPassword').value;
        const confirmPassword = document.getElementById('companyConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('/api/auth/register/company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ companyName, email, password })
            });

            if (response.ok) {
                // Redirect to company login page
                window.location.href = '/company-login.html';
            } else {
                alert('Registration failed. Please check your details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
