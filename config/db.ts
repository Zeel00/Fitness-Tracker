import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fitness_center',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const initDatabase = async () => {
  try {
    // Create users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create workout_history table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS workout_history (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        workout_id VARCHAR(255) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        duration INT,
        completed BOOLEAN DEFAULT false,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

export default pool;