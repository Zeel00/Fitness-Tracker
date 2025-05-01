import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { auth } from '../middleware/auth';

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await UserModel.create({ name, email, password });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await UserModel.verifyPassword(user, password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't send the password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await UserModel.updateProfile(req.user.userId, name, email);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's workout history
router.get('/workout-history', auth, async (req, res) => {
  try {
    const workoutHistory = await UserModel.getWorkoutHistory(req.user.userId);
    res.json(workoutHistory);
  } catch (error) {
    console.error('Workout history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;