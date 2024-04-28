// Function to delete a post
const deletePost = async (post_id) => {
    // Send a DELETE request to the API endpoint for deleting a post
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }, // Set request headers
    });
  
    // Check if the request was successful
    if (response.ok) {
      // If successful, reload the page to reflect the changes
      document.location.reload();
    } else {
      // If unsuccessful, display an alert message
      alert("Failed to delete the post.");
    }
  };
  
  // Event handler for deleting a post
  const deletePostHandler = (event) => {
    // Check if the clicked element matches the delete-post class
    if (event.target.matches(".delete-post")) {
      // Get the post ID from the data-post-id attribute
      const post_id = event.target.getAttribute("data-post-id");
      // Call the deletePost function with the post ID
      deletePost(post_id);
    }
  };
  
  // Event listener for click events
  document.addEventListener("click", deletePostHandler);
  