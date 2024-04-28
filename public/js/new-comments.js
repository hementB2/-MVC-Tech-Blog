// Function to handle the submission of a new chess comment
const newChessCommentFormHandler = async (event) => {
    event.preventDefault();
  
    // Extract the post ID from the URL
    const post_id = parseInt(window.location.pathname.split('/').pop());
  
    // Get the content of the new comment
    const content = document.querySelector('#content-new-chess-comment').value.trim();
  
    // If the content is not empty
    if (content) {
      // Send a POST request to create a new comment
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text: content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the request was successful, reload the page
      if (response.ok) {
        document.location.reload();
      } else {
        // If the request was unsuccessful, log the response status and display an alert
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
        alert('Failed to create a comment.');
      }
    }
  };
  
  // Event listener for the new chess comment form submission
  const newChessCommentForm = document.querySelector('.new-chess-comment-form');
  if (newChessCommentForm) {
    newChessCommentForm.addEventListener('submit', newChessCommentFormHandler);
  }
  