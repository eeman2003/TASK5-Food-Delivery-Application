document.addEventListener('DOMContentLoaded', function() {
    // Handle restaurant signup form submission
    const signupForm = document.getElementById('restaurant-signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const restaurantName = document.getElementById('restaurant-name').value;
            const restaurantEmail = document.getElementById('restaurant-email').value;
            const restaurantPassword = document.getElementById('restaurant-password').value;

            // Simulating form submission
            console.log('Restaurant Signup Form Submitted');
            console.log('Name:', restaurantName);
            console.log('Email:', restaurantEmail);
            console.log('Password:', restaurantPassword);

            // Perform actual form submission logic here, like sending data to a server

            alert('Restaurant signed up successfully!');
        });
    }

    // Handle add dish form submission
    
        // Check if the user is logged in and approved
       
    
        // Add Dishes
        const addDishesForm = document.getElementById('add-dish-form');
        if (addDishesForm) {
            addDishesForm.addEventListener('submit', function(event) {
                event.preventDefault();
    
                // Retrieve the logged-in restaurant
                const restaurant = JSON.parse(localStorage.getItem('loggedInRestaurant'));
    
                // Check if the restaurant object is valid
                if (!restaurant || !restaurant.email) {
                    alert('No restaurant is logged in or logged-in data is missing.');
                    return;
                }
    
                // Create the dish object
                const dish = {
                    name: document.getElementById('dish-name').value,
                    description: document.getElementById('dish-description').value,
                    price: document.getElementById('dish-price').value
                };
    
                // Retrieve or initialize the dishes array
                const dishes = JSON.parse(localStorage.getItem(`dishes_${restaurant.email}`)) || [];
    
                // Add the new dish to the array
                dishes.push(dish);
    
                // Save the updated dishes array back to localStorage
                localStorage.setItem(`dishes_${restaurant.email}`, JSON.stringify(dishes));
    
                alert('Dish added successfully!');
                addDishesForm.reset();
            });
        }
        // View Orders
        const viewOrders = document.getElementById('order-list');
    
    // Retrieve user information from localStorage
    const user = JSON.parse(localStorage.getItem('loggedInRestaurant'));
    if (!user) {
        console.error('No user logged in.');
        return;
    }
    
    console.log('Logged-in restaurant:', user.name); // Debugging line

    if (viewOrders) {
        // Retrieve orders from localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        console.log('Orders:', orders); // Debugging line

        // Filter orders for the logged-in restaurant
        const restaurantOrders = orders.filter(order => order.restaurant === user.name);
        console.log('Restaurant orders:', restaurantOrders); // Debugging line

        // Display orders
        viewOrders.innerHTML = restaurantOrders.length > 0
            ? restaurantOrders.map(order => `
                <div>
                    <p><strong>Customer:</strong> ${order.customer}</p>
                    <p><strong>Dish:</strong> ${order.dish}</p>
                    <p><strong>Quantity:</strong> ${order.quantity}</p>
                    <p><strong>Total Price:</strong> $${order.totalPrice}</p>
                </div>
            `).join('')
            : '<p>No orders yet.</p>';
    }

    
});
