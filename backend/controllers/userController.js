//Used for hashing passwords to enhance security
import bcrypt from 'bcryptjs';
// Used for generating authentication tokens for users.
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt received for email:', email);

    // Input validation
    if (!email || !password) {
      console.log('Missing email or password in request');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User found in database:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Invalid password provided for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      process.env.JWT_SECRET || 'your-default-secret',
      { expiresIn: '24h' }
    );

    console.log('Login successful, token generated for:', email);

    // Send response with user object structure matching frontend interface
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: '', // Empty string to match frontend interface
        token: token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'An error occurred during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Registration attempt received for:', email);

    // Input validation
    if (!name || !email || !password) {
      console.log('Missing required fields in registration request');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Password validation
    if (password.length < 6) {
      console.log('Password too short for:', email);
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user to database
    await user.save();
    console.log('New user created successfully:', email);

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      process.env.JWT_SECRET || 'your-default-secret',
      { expiresIn: '24h' }
    );

    // Send response with user object structure matching frontend interface
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: '', // Empty string to match frontend interface
        token: token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle mongoose duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    res.status(500).json({ 
      message: 'An error occurred during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


