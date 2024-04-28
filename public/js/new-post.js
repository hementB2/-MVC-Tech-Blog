// Function to handle the submission of a new chess post
const newChessPostFormHandler = async (event) => {
    event.preventDefault();
  
    // Get the title and content of the new post
    const title = document.querySelector('#title-new-chess-post').value.trim();
    const content = document.querySelector('#content-new-chess-post').value.trim();
  
    // If both title and content are not empty
    if (title && content) {
      // Send a POST request to create a new post
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the request was successful, redirect to the dashboard page
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // If the request was unsuccessful, show an alert
        alert('Failed to create a new post.');
      }
    }
  };
  
  // Event listener for the new chess post form submission
  const newChessPostForm = document.querySelector('.new-chess-post-form');
  if (newChessPostForm) {
    newChessPostForm.addEventListener('submit', newChessPostFormHandler);
  }
  