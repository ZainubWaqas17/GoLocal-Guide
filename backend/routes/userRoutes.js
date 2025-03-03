
import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import User from '../models/userModel.js';

const router = express.Router();

// Test route to check users
router.get('/test', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

router.post('/login', loginUser);
router.post('/signup', registerUser);

export default router;