document.addEventListener('DOMContentLoaded', function() {
    // Handle customer signup form submission
   
        const signupForm = document.getElementById('customer-signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const customerName = document.getElementById('customer-name').value;
                const customerEmail = document.getElementById('customer-email').value;
                const customerPassword = document.getElementById('customer-password').value;
    
                // Simulating form submission
                console.log('Customer Signup Form Submitted');
                console.log('Name:', customerName);
                console.log('Email:', customerEmail);
                console.log('Password:', customerPassword);
    
                // Perform actual form submission logic here, like sending data to a server
    
                alert('Customer signed up successfully!');
            });
        }
    
    

    

    // Fetch and display list of dishes
    const dishList = document.getElementById('dish-list');
    if (dishList) {
        // Retrieve the logged-in restaurant's email
        const restaurant = JSON.parse(localStorage.getItem('loggedInRestaurant'));
        
        if (restaurant && restaurant.email) {
            // Retrieve dishes for the logged-in restaurant
            const dishes = JSON.parse(localStorage.getItem(`dishes_${restaurant.email}`)) || [];

            // Check if there are dishes and display them
            if (dishes.length > 0) {
                dishes.forEach(function(dish) {
                    const div = document.createElement('div');
                    div.classList.add('dish-item');
                    div.innerHTML = `
                        <h3>${dish.name}</h3>
                        <p>${dish.description}</p>
                        <p>Price: $${dish.price}</p>
                    `;
                    dishList.appendChild(div);
                });
            } else {
                dishList.innerHTML = '<p>No dishes available.</p>';
            }
        } else {
            dishList.innerHTML = '<p>Restaurant not logged in.</p>';
        }
    }

       
        // Browse Restaurants
        const restaurantsList = document.getElementById('restaurant-list');
        if (restaurantsList) {
            const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
            restaurantsList.innerHTML = restaurants.filter(r => r.approved).map(restaurant => `
                <div>
                    <h3>${restaurant.name}</h3>
                    <a href="dishes.html?restaurant=${encodeURIComponent(restaurant.name)}">View Dishes</a>
                </div>
            `).join('');
        }
    
        const restaurantSelect = document.getElementById('order-restaurant');
    const dishSelect = document.getElementById('order-dish');
    const quantityInput = document.getElementById('order-quantity');
    const totalPriceInput = document.getElementById('order-total-price');
    const placeOrderForm = document.getElementById('order-placement-form');

    // Fetch the logged-in customer from localStorage
    const loggedInCustomer = JSON.parse(localStorage.getItem('loggedInCustomer'));
    if (!loggedInCustomer) {
        alert('Please log in to place an order.');
        return;
    }
    console.log('Logged-in customer:', loggedInCustomer.name); // Debugging line

    // Fetch restaurants from localStorage
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];

    // Populate restaurant dropdown
    restaurants.forEach(restaurant => {
        const option = document.createElement('option');
        option.value = restaurant.email; // Assuming email is used to identify restaurant
        option.textContent = restaurant.name;
        restaurantSelect.appendChild(option);
    });

    // Update dish dropdown based on selected restaurant
    restaurantSelect.addEventListener('change', function() {
        const selectedRestaurantEmail = restaurantSelect.value;
        dishSelect.innerHTML = '<option value="">Select a dish</option>'; // Reset dish dropdown

        if (selectedRestaurantEmail) {
            const dishes = JSON.parse(localStorage.getItem(`dishes_${selectedRestaurantEmail}`)) || [];
            
            dishes.forEach(dish => {
                const option = document.createElement('option');
                option.value = JSON.stringify(dish);
                option.textContent = dish.name;
                dishSelect.appendChild(option);
            });
        }
    });

    // Update total price when dish or quantity changes
    dishSelect.addEventListener('change', updateTotalPrice);
    quantityInput.addEventListener('input', updateTotalPrice);

    function updateTotalPrice() {
        const selectedDish = JSON.parse(dishSelect.value);
        const quantity = parseInt(quantityInput.value, 10);

        if (selectedDish && quantity > 0) {
            const totalPrice = selectedDish.price * quantity;
            totalPriceInput.value = totalPrice.toFixed(2);
        } else {
            totalPriceInput.value = '';
        }
    }

    // Handle form submission
    if (placeOrderForm) {
        placeOrderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const order = {
                customer: loggedInCustomer.name,
                restaurant: restaurantSelect.options[restaurantSelect.selectedIndex].text,
                dish: JSON.parse(dishSelect.value).name,
                quantity: quantityInput.value,
                totalPrice: totalPriceInput.value
            };

            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            alert('Order placed successfully!');
            placeOrderForm.reset();
        });
    }
    
});
