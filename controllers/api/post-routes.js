const router = require("express").Router(); // Import the Router module from Express
const { Post, User, Comment } = require("../../models"); // Import the Post, User, and Comment models
const withAuth = require("../../utils/auth"); // Import the withAuth middleware for authentication

// Get all posts with associated username
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }], // Include the associated User model to get the username
    });
    res.status(200).json(postData); // Send the post data as JSON response
  } catch (err) {
    res.status(500).json(err); // Send an error response if something went wrong
  }
});

// Get one post by ID with associated username and comments
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] }, // Include the associated User model to get the username
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }], // Include the associated User model for comments to get the username
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with that id!" }); // Send a 404 response if no post found with the given ID
      return;
    }
    res.status(200).json(postData); // Send the post data as JSON response
  } catch (err) {
    res.status(500).json(err); // Send an error response if something went wrong
  }
});

// Create a new post with authenticated user
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id, // Set the user_id to the authenticated user's id from session
    });
    res.status(200).json(newPost); // Send the new post data as JSON response
  } catch (err) {
    res.status(400).json(err); // Send an error response if something went wrong
  }
});

// Update an existing post with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with that id!" }); // Send a 404 response if no post found with the given ID
      return;
    }
    res.status(200).json(updatedPost); // Send the updated post data as JSON response
  } catch (err) {
    res.status(500).json(err); // Send an error response if something went wrong
  }
});

// Delete a post with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete all comments related to the post
    await Comment.destroy({
      where: { post_id: req.params.id },
    });

    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "No post found with that id!" }); // Send a 404 response if no post found with the given ID
      return;
    }
    res.status(200).json(deletedPost); // Send the deleted post data as JSON response
  } catch (err) {
    res.status(500).json(err); // Send an error response if something went wrong
  }
});

// Export the router
module.exports = router;
