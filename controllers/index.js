// Import the necessary modules and routes
const router = require("express").Router(); // Import the Router module from Express
const apiRoutes = require("./api"); // Import API routes
const homeRoutes = require("./home-routes"); // Import home routes

// Set up routes
router.use("/api", apiRoutes); // Mount API routes at the '/api' base path
router.use("/", homeRoutes); // Mount home routes at the root path '/'

// Export the router
module.exports = router;
