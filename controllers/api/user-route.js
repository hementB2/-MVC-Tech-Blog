const router = require("express").Router(); // Import the Router module from Express
const { User } = require("../../models"); // Import the User model

// Route to get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] }, // Exclude the password field from the response
  })
    .then((dbUserData) => res.json(dbUserData)) // Send the user data as JSON response
    .catch((err) => {
      console.log(err); // Log any errors
      res.status(500).json(err); // Send a 500 status code and error response if something went wrong
    });
});

// Route to sign up a new user
router.post("/signup", async (req, res) => {
  try {
    const newUser = new User(); // Create a new instance of User model
    newUser.username = req.body.username; // Set the username
    newUser.email = req.body.email; // Set the email
    newUser.password = req.body.password; // Set the password

    const userData = await newUser.save(); // Save the new user to the database

    req.session.save(() => {
      req.session.user_id = userData.id; // Set the user_id in the session
      req.session.logged_in = true; // Set logged_in to true in the session

      res.status(200).json(userData); // Send a 200 status code and user data as JSON response
    });
  } catch (err) {
    res.status(400).json(err); // Send a 400 status code and error response if something went wrong
    console.log(err); // Log the error
  }
});

// Route to log in a user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } }); // Find user by username

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password, please try again" }); // Send a 400 status code and error message if user not found
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password); // Check if password is valid

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, please try again" }); // Send a 400 status code and error message if password is invalid
      return;
    }

    req
