import bcrypt from 'bcryptjs'
import pool from '../config/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

export interface User extends RowDataPacket {
  id: number
  name: string
  email: string
  password: string
  gender?: string
  age?: number
  bodyType?: string
  goals?: string
  currentWeight?: number
  targetWeight?: number
  created_at: Date
}

export class UserModel {
  static async create(
    name: string, 
    email: string, 
    password: string,
    gender?: string,
    age?: number,
    bodyType?: string,
    goals?: string[],
    currentWeight?: number,
    targetWeight?: number
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (
        name, email, password, gender, age, body_type, goals, 
        current_weight, target_weight
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        email, 
        hashedPassword, 
        gender || null, 
        age || null, 
        bodyType || null, 
        goals ? JSON.stringify(goals) : null,
        currentWeight || null,
        targetWeight || null
      ]
    )
    const [users] = await pool.execute<User[]>(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    )
    return users[0]
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [users] = await pool.execute<User[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    return users[0] || null
  }

  static async findById(id: number): Promise<User | null> {
    const [users] = await pool.execute<User[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    )
    return users[0] || null
  }
}