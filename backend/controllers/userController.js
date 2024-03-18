// backend/controllers/userController.js
const User = require('../models/User'); // Adjust the path as necessary

// Function to add a new user
exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
