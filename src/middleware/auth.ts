import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user'

// Extend Express Request type
declare module 'express' {
  interface Request {
    user?: {
      id: number
      name: string
      email: string
    }
  }
}

export const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ error: 'Please authenticate.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
    const user = await UserModel.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ error: 'Please authenticate.' })
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' })
  }
}