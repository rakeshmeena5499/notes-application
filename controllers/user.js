const User = require('../models/user');
const jwt = require('jsonwebtoken');

// User Registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const user = new User({ username, password });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'SecretKey', {
        "algorithm": "HS256",
        expiresIn: 86400
      });

    res.status(201).json({ token, userId: user._id, message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed.' });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'SecretKey', {
        "algorithm": "HS256",
        expiresIn: 86400
      });

    res.status(200).json({ token, userId: user._id, message: 'Login successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login failed.' });
  }
};
