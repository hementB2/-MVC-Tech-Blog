// Function to log out the user by sending a request to the logout endpoint
const chessLogout = async () => {
    // Send a POST request to the logout endpoint
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // If the request was successful, redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // If the request was unsuccessful, display an alert
      alert('Failed to log out.');
    }
  };
  
  // Event listener for the logout button
  const chessLogoutButton = document.querySelector('#chess-logout');
  if (chessLogoutButton) {
    chessLogoutButton.addEventListener('click', chessLogout);
  }
  