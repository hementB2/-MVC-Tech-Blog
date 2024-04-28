// Import the required modules
const router = require("express").Router(); // Import the Router module from Express
const userRoutes = require("./user-routes"); // Import user-related routes
const postRoutes = require("./post-routes"); // Import post-related routes
const commentRoutes = require("./comment-routes"); // Import comment-related routes

// Set up the routes
router.use("/users", userRoutes); // Use user-related routes
router.use("/posts", postRoutes); // Use post-related routes
router.use("/comments", commentRoutes); // Use comment-related routes

// Export the router
module.exports = router;
