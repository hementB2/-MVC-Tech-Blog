// Function to handle the submission of the signup form
const chessSignupFormHandler = async (event) => {
    event.preventDefault();
  
    // Get the values of username, email, and password from the form fields
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    // If all fields have values
    if (username && email && password) {
      // Send a POST request to sign up the user
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the request was successful, redirect to the homepage
      if (response.ok) {
        document.location.replace('/');
      } else {
        // If the request was unsuccessful, show an alert
        alert('Failed to sign up.');
      }
    }
  };
  
  // Event listener for the signup form submission
  const chessSignupForm = document.querySelector('#signup-form');
  if (chessSignupForm) {
    chessSignupForm.addEventListener('submit', chessSignupFormHandler);
  }
  