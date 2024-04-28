// Function to handle chess login form submission
const chessLoginFormHandler = async (event) => {
    event.preventDefault();
  
    // Get the values of the username and password input fields
    const username = document.querySelector('#username-chess-login').value.trim();
    const password = document.querySelector('#password-chess-login').value.trim();
  
    // If both username and password are provided
    if (username && password) {
      // Send a POST request to the login endpoint with the input values as JSON data
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Check if the request was successful
      if (response.ok) {
        // If successful, redirect to the homepage
        document.location.replace('/');
      } else {
        // If unsuccessful, display an alert message
        alert('Failed to log in.');
      }
    }
  };
  
  // Event listener for the chess login form submission
  const chessLoginForm = document.querySelector('.chess-login-form');
  if (chessLoginForm) {
    chessLoginForm.addEventListener('submit', chessLoginFormHandler);
  }
  