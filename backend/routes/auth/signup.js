const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const router = express.Router();

// Sign-up route
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username already exists. Please choose a different username' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'secret', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Sign-up failed:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
