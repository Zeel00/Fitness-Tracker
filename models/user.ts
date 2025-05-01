import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import pool from '../config/db';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  join_date?: Date;
}

export interface WorkoutHistory {
  id: string;
  user_id: string;
  workout_id: string;
  date: Date;
  duration: number;
  completed: boolean;
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  static async findById(id: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async create(userData: Omit<User, 'id'>): Promise<User> {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await pool.execute(
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
      [id, userData.name, userData.email, hashedPassword]
    );

    return { id, ...userData, password: hashedPassword };
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  static async updateProfile(id: string, name: string, email: string): Promise<User | null> {
    await pool.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    return this.findById(id);
  }

  static async addWorkoutHistory(workoutData: Omit<WorkoutHistory, 'id' | 'date'>): Promise<WorkoutHistory> {
    const id = uuidv4();
    await pool.execute(
      'INSERT INTO workout_history (id, user_id, workout_id, duration, completed) VALUES (?, ?, ?, ?, ?)',
      [id, workoutData.user_id, workoutData.workout_id, workoutData.duration, workoutData.completed]
    );

    const [rows] = await pool.execute(
      'SELECT * FROM workout_history WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async getWorkoutHistory(userId: string): Promise<WorkoutHistory[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM workout_history WHERE user_id = ? ORDER BY date DESC',
      [userId]
    );
    return rows as WorkoutHistory[];
  }
}