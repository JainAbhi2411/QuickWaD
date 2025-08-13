// controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Signup controller
const signup = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    const user = new User({ name, email, phone, password });
    await user.save();

    const token = generateToken(user._id); // Generate JWT token

    // Set the token in the cookie
    res.cookie('token', token, {
      httpOnly: true,           // Prevent access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
      sameSite: 'Strict',       // Prevent cross-site requests
      maxAge: 3600000,          // Set cookie expiration (1 hour)
    });

    // Return success with user info
    res.status(201).json({ success: true, user: { name, email, phone,id } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id); // Generate JWT token

    // Set the token in the cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Only set cookie over HTTPS in production
      sameSite: 'Strict',
      maxAge: 3600000, // 1 hour expiration
    });

    res.status(200).json({ 
      success: true,
      user: { name: user.name, email: user.email, phone: user.phone,id:user._id } });
  } catch (error) {

    res.status(500).json({ 
      success: false,
      message: 'Server error' });
  }
};
const getUserProfile = async (req, res) => {
  try {
    // Fetch the user by the id stored in req.user (from token)
    const user = await User.findById(req.user).select('-password'); // Don't return password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);  // Send user details
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { name, email, phone, address } = req.body;
  console.log(req.user);

  try {
    // Find the user by ID from the token
    const user = await User.findById(req.user.id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details with the provided data
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();  // Save updated user data

    res.json({ 
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login , getUserProfile, updateUserProfile};
