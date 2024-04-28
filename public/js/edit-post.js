// Extract the post ID from the current endpoint URL
const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  
  // Function to handle updating a chess post
  const updateChessPostFormHandler = async (event) => {
    event.preventDefault();
  
    // Retrieve the updated title and content from the form
    const title = document.querySelector("#title-update-chess-post").value.trim();
    const content = document.querySelector("#content-update-chess-post").value.trim();
  
    // Check if both title and content are provided
    if (title && content) {
      // Send a PUT request to update the post
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      // Check if the request was successful
      if (response.ok) {
        // If successful, redirect to the dashboard page
        document.location.replace("/dashboard");
      } else {
        // If unsuccessful, display an alert message
        alert("Failed to update the post.");
      }
    }
  };
  
  // Function to handle deleting a chess post
  const deleteChessPostFormHandler = async (event) => {
    event.preventDefault();
  
    // Send a DELETE request to delete the post
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });
  
    // Check if the request was successful
    if (response.ok) {
      // If successful, redirect to the dashboard page
      document.location.replace("/dashboard");
    } else {
      // If unsuccessful, display an alert message
      alert("Failed to delete the post.");
    }
  };
  
  // Event listeners for update and delete buttons
  const updateChessPostButton = document.querySelector("#update-chess-post");
  if (updateChessPostButton) {
    updateChessPostButton.addEventListener("click", updateChessPostFormHandler);
  }
  
  const deleteChessPostButton = document.querySelector("#delete-chess-post");
  if (deleteChessPostButton) {
    deleteChessPostButton.addEventListener("click", deleteChessPostFormHandler);
  }
  