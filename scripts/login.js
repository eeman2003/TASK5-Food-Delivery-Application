document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];

    // Find the user in either the customers or restaurants list
    let user = customers.find(c => c.email === email && c.password === password) ||
               restaurants.find(r => r.email === email && r.password === password);

    if (user) {
        if (user.approved) {
            // Store the logged-in user in local storage based on user type
            if (user.userType === 'customer') {
                localStorage.setItem('loggedInCustomer', JSON.stringify(user));
                console.log('Logged-in customer:', user.name);  // Debugging line
                window.location.href = 'customer/dashboard.html';  // Redirect to customer dashboard
            } else if (user.userType === 'restaurant') {
                localStorage.setItem('loggedInRestaurant', JSON.stringify(user));
                console.log('Logged-in restaurant:', user.name);  // Debugging line
                window.location.href = 'restaurant/dashboard.html';  // Redirect to restaurant dashboard
            }
        } else {
            alert('Your account is pending approval.');
        }
    } else {
        alert('Invalid email or password.');
    }
});