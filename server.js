// Import necessary modules and dependencies
const express = require("express"); // Importing Express.js module
const session = require("express-session"); // Importing express-session module for session management
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Importing SequelizeStore module for session storage
const routes = require("./controllers"); // Importing routes from the controllers directory
const sequelize = require("./config/connection"); // Importing sequelize connection
const exphbs = require("express-handlebars"); // Importing Express Handlebars for rendering views
const hbs = exphbs.create({ helpers: require("./utils/helpers") }); // Creating Handlebars instance with custom helpers

// Creating express app and setting port
const app = express(); // Creating Express app instance
const PORT = process.env.PORT || 3001; // Setting the port number

// Setting up session object with secret, cookie, and store
const sess = {
  secret: 'Super secret secret', // Secret key for session
  cookie: {}, // Cookie settings
  resave: false, // Resave option
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({ // Session store using Sequelize
    db: sequelize, // Sequelize instance
  }),
};

// Using session middleware with session object
app.use(session(sess)); // Using session middleware

// Parsing incoming JSON and URL-encoded data
app.use(express.json()); // Parsing JSON data
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded data

// Serving static files such as images from public directory
app.use(express.static("public")); // Serving static files from the public directory

// Setting up Handlebars as the view engine
app.engine("handlebars", hbs.engine); // Setting Handlebars as the template engine
app.set("view engine", "handlebars"); // Setting the view engine to Handlebars

// Using session middleware again with a different session object
app.use(
  session({
    secret: process.env.SECRET, // Secret key for session
    store: new SequelizeStore({ db: sequelize }), // Session store using Sequelize
    resave: false, // Resave option
    saveUninitialized: false, // Do not save uninitialized sessions
  })
);

// Using routes from controller
app.use(routes); // Using routes from the controller

// Syncing sequelize models with database and starting server
sequelize.sync({ force: false }).then(() => { // Syncing Sequelize models with the database
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // Starting the server
});
