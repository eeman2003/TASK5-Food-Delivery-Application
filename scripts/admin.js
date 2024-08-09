document.addEventListener('DOMContentLoaded', function() {

   
        const adminLoginForm = document.getElementById('admin-login-form');
        const loginError = document.getElementById('login-error');
    
        // Dummy admin credentials for demonstration purposes
        const adminCredentials = {
            email: 'admin@gmail.com',
            password: 'admin123'
        };
    
        if (adminLoginForm) {
            adminLoginForm.addEventListener('submit', function(event) {
                event.preventDefault();
    
                const email = document.getElementById('admin-email').value;
                const password = document.getElementById('admin-password').value;
    
                // Check if the entered credentials match the dummy admin credentials
                if (email === adminCredentials.email && password === adminCredentials.password) {
                    alert("Admin Logged In Successfully");
                    localStorage.setItem('loggedInAdmin', JSON.stringify(adminCredentials));
                    window.location.href = '../admin/dashboard.html'; // Redirect to admin dashboard
                } else {
                    loginError.textContent = 'Invalid email or password.';
                }
            });
        }
    
    






        const pendingApprovalsSection = document.getElementById('account-approval');
        if (pendingApprovalsSection) {
            const customerApprovals = JSON.parse(localStorage.getItem('customerApprovals')) || [];
            const restaurantApprovals = JSON.parse(localStorage.getItem('restaurantApprovals')) || [];
    
            function renderApprovals() {
                pendingApprovalsSection.innerHTML = '';
    
                if (customerApprovals.length === 0 && restaurantApprovals.length === 0) {
                    pendingApprovalsSection.innerHTML = '<p>No pending approvals.</p>';
                    return;
                }
    
                customerApprovals.forEach((customer, index) => {
                    const customerDiv = document.createElement('div');
                    customerDiv.classList.add('approval-item');
                    customerDiv.innerHTML = `
                        <p><strong>Customer:</strong> ${customer.name}</p>
                        <p><strong>Email:</strong> ${customer.email}</p>
                        <button class="approve-button" data-type="customer" data-index="${index}">Approve</button>
                    `;
                    pendingApprovalsSection.appendChild(customerDiv);
                });
    
                restaurantApprovals.forEach((restaurant, index) => {
                    const restaurantDiv = document.createElement('div');
                    restaurantDiv.classList.add('approval-item');
                    restaurantDiv.innerHTML = `
                        <p><strong>Restaurant:</strong> ${restaurant.name}</p>
                        <p><strong>Email:</strong> ${restaurant.email}</p>
                        <button class="approve-button" data-type="restaurant" data-index="${index}">Approve</button>
                    `;
                    pendingApprovalsSection.appendChild(restaurantDiv);
                });
    
                document.querySelectorAll('.approve-button').forEach(button => {
                    button.addEventListener('click', function(event) {
                        const type = event.target.dataset.type;
                        const index = event.target.dataset.index;
                        
                        if (type === 'customer') {
                            const customer = customerApprovals.splice(index, 1)[0];
                            customer.approved = true;
                            const customers = JSON.parse(localStorage.getItem('customers')) || [];
                            const customerIndex = customers.findIndex(c => c.email === customer.email);
                            if (customerIndex !== -1) {
                                customers[customerIndex].approved = true;
                                localStorage.setItem('customers', JSON.stringify(customers));
                            } else {
                                // If the customer isn't in the main list, add them
                                customers.push(customer);
                                localStorage.setItem('customers', JSON.stringify(customers));
                            }
                            localStorage.setItem('customerApprovals', JSON.stringify(customerApprovals));
                        } else if (type === 'restaurant') {
                            const restaurant = restaurantApprovals.splice(index, 1)[0];
                            restaurant.approved = true;
                            const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
                            const restaurantIndex = restaurants.findIndex(r => r.email === restaurant.email);
                            if (restaurantIndex !== -1) {
                                restaurants[restaurantIndex].approved = true;
                                localStorage.setItem('restaurants', JSON.stringify(restaurants));
                            } else {
                                // If the restaurant isn't in the main list, add them
                                restaurants.push(restaurant);
                                localStorage.setItem('restaurants', JSON.stringify(restaurants));
                            }
                            localStorage.setItem('restaurantApprovals', JSON.stringify(restaurantApprovals));
                        }
                        renderApprovals();
                    });
                });
            }
    
            renderApprovals();
        }
});
