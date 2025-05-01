import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    console.log('Registration request body:', req.body);

    const { 
      name, 
      email, 
      password,
      gender,
      age,
      bodyType,
      goals,
      currentWeight,
      targetWeight
    } = req.body

    console.log('Parsed registration data:', {
      name, email, gender, age, bodyType, goals,
      currentWeight, targetWeight,
      hasPassword: !!password
    });

    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({ 
        error: 'Missing required fields', 
        fields: missingFields 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email)
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Create new user
    const user = await UserModel.create(
      name, 
      email, 
      password,
      gender,
      age,
      bodyType,
      goals,
      currentWeight,
      targetWeight
    )

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    res.status(201).json({
      user: userWithoutPassword,
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Find user
    const user = await UserModel.findByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '7d'
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    res.json({
      user: userWithoutPassword,
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router