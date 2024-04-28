const { Comment } = require("../models");

// Data for seeding comments
const commentData = [
  {
    comment_text: "Excellent write-up!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "I share the same perspective!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "I respectfully disagree!",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text: "I concur with your points!",
    user_id: 4,
    post_id: 1,
  },
  {
    comment_text: "I have a different viewpoint!",
    user_id: 5,
    post_id: 1,
  },
  {
    comment_text: "Well articulated!",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text: "You've made some valid points!",
    user_id: 2,
    post_id: 2,
  }
];

// Function to seed comments
const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
