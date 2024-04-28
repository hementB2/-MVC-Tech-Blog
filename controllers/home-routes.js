// Import necessary packages and models
const router = require("express").Router(); // Import the Router module from Express
const { Post, User, Comment } = require("../models"); // Import Post, User, and Comment models
const withAuth = require("../utils/auth"); // Import the authentication middleware

// Route to render homepage
router.get("/", async (req, res) => {
  try {
    // Find all posts with associated usernames
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }], // Include User model to get username
    });
    // Convert post data to plain JavaScript object
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render homepage template with posts and login status
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in, // Pass login status to template
    });
  } catch (err) {
    // If there is an error, return 500 status code and error message
    res.status(500).json(err);
  }
});

// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Find post by ID with associated username and comments with associated usernames
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] }, // Include User model to get username
        {
          model: Comment, // Include Comment model
          include: [{ model: User, attributes: ["username"] }], // Include User model for comments
        },
      ],
    });
    // Convert post data to plain JavaScript object
    const post = postData.get({ plain: true });
    // Render post template with post data and login status
    res.render("post", {
      ...post,
      logged_in: req.session.logged_in, // Pass login status to template
    });
  } catch (err) {
    // If there is an error, return 500 status code and error message
    res.status(500).json(err);
  }
});

// Route to render dashboard page with all posts by current user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find all posts by current user with associated usernames
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id }, // Filter by user ID from session
      include: [{ model: User, attributes: ["username"] }], // Include User model to get username
    });
    // Convert post data to plain JavaScript object
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in, // Pass login status to template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    // If user is already logged in, redirect to dashboard
    res.redirect("/dashboard");
    return;
  }
  res.render("login"); // Render login page
});

// Route to render signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    // If user is already logged in, redirect to dashboard
    res.redirect("/dashboard");
    return;
  }
  res.render("signup"); // Render signup page
});

// Route to render new post page
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    // If user is logged in, render newpost page
    res.render("newpost");
    return;
  }
  res.redirect("/login"); // If user is not logged in, redirect to login page
});

// Route to render edit post page
router.get("/editpost/:id", async (req, res) => {
  try {
    // Find post by ID with associated username and comments with associated usernames
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] }, // Include User model to get username
        {
          model: Comment, // Include Comment model
          include: [{ model: User, attributes: ["username"] }], // Include User model for comments
        },
      ],
    });

    const post = postData.get({ plain: true }); // Convert post data to plain JavaScript object

    res.render("editpost", {
      ...post,
      logged_in: req.session.logged_in, // Pass login status to template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;
