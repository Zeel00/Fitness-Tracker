import fs from 'fs'
import path from 'path'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...')

    // Create connection without database selection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'zeel055',
    })

    // Create database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS fitness_center')
    console.log('Database created or already exists')

    // Switch to the fitness_center database
    await connection.query('USE fitness_center')
    console.log('Using fitness_center database')

    // Read the schema file
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    )
    console.log('Schema file read successfully')

    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .filter(statement => statement.trim().length > 0)

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing statement:', statement.substring(0, 50) + '...')
        await connection.query(statement)
      }
    }

    // Verify tables were created
    const [tables] = await connection.query('SHOW TABLES')
    console.log('Created tables:', tables)

    console.log('Database initialized successfully')
    await connection.end()
    process.exit(0)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initializeDatabase()