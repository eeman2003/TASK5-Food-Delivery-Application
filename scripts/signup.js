document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userType = document.getElementById('user-type').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const newUser = {
        name: name,
        email: email,
        password: password,
        userType: userType,
        approved: false
    };

    let approvalsKey = userType === 'customer' ? 'customerApprovals' : 'restaurantApprovals';
    let approvals = JSON.parse(localStorage.getItem(approvalsKey)) || [];
    approvals.push(newUser);
    localStorage.setItem(approvalsKey, JSON.stringify(approvals));

    alert('Signup successful! Your account is pending approval.');
    window.location.href = '../index.html';  // Redirect to homepage
});