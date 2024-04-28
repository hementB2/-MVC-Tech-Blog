// Import the required modules
const router = require("express").Router(); // Import the Router module from Express
const { Comment } = require("../../models"); // Import the Comment model
const withAuth = require("../../utils/auth"); // Import the authentication middleware

// Create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new comment with the provided data
    const newComment = await Comment.create({
      ...req.body, // Spread the request body to include all provided data
      user_id: req.session.user_id, // Set the user_id to the current user's ID from the session
    });
    // Send a response with the new comment data
    res.status(200).json(newComment);
  } catch (err) {
    // Send an error response if something went wrong
    res.status(400).json(err);
  }
});

// Export the router
module.exports = router;
