document.getElementById('logout-button').addEventListener('click', function() {
    // Clear session or token (this could be a cookie, localStorage item, etc.)
    // For example, if you're using localStorage to store a token:
   
    // Optionally, you could make an API call to your backend to invalidate the session on the server side.
    // fetch('/api/logout', { method: 'POST' }).then(response => {
    //     // handle response if necessary
    // });

    // Redirect to the login page
    window.location.href = '/index.html';
});