-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS fitness_center;
USE fitness_center;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS workout_exercises;
DROP TABLE IF EXISTS workout_plans;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS target_muscles;
DROP TABLE IF EXISTS fitness_info;
DROP TABLE IF EXISTS fitness_goals;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(50),
  age INT,
  body_type VARCHAR(50),
  goals TEXT,
  current_weight DECIMAL(5,2),
  target_weight DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create equipment table
CREATE TABLE equipment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255)
);

-- Create target muscles table
CREATE TABLE target_muscles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  body_part VARCHAR(255) NOT NULL
);

-- Create exercises table
CREATE TABLE exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty_level ENUM('beginner', 'intermediate', 'advanced'),
  equipment_id INT,
  target_muscle_id INT,
  video_url VARCHAR(255),
  image_url VARCHAR(255),
  FOREIGN KEY (equipment_id) REFERENCES equipment(id),
  FOREIGN KEY (target_muscle_id) REFERENCES target_muscles(id)
);

-- Create workout plans table
CREATE TABLE workout_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty_level ENUM('beginner', 'intermediate', 'advanced'),
  duration_weeks INT,
  created_by INT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create workout exercises table (junction table between workout_plans and exercises)
CREATE TABLE workout_exercises (
  id INT PRIMARY KEY AUTO_INCREMENT,
  workout_plan_id INT,
  exercise_id INT,
  sets INT,
  reps INT,
  duration_minutes INT,
  day_of_week INT,
  week_number INT,
  notes TEXT,
  FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id),
  FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- Create fitness goals table
CREATE TABLE fitness_goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  goal_type ENUM('weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'strength'),
  target_value DECIMAL(5,2),
  start_date DATE,
  target_date DATE,
  status ENUM('in_progress', 'completed', 'abandoned') DEFAULT 'in_progress',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create fitness info table (for tracking progress)
CREATE TABLE fitness_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  weight DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,1),
  muscle_mass DECIMAL(4,1),
  measurement_date DATE,
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert some initial data for equipment
INSERT INTO equipment (name, description) VALUES
('Dumbbell', 'Free weights for strength training'),
('Treadmill', 'Cardio machine for running or walking'),
('Yoga Mat', 'Mat for floor exercises and stretching'),
('Resistance Band', 'Elastic bands for resistance training'),
('Barbell', 'Long bar used with weight plates');

-- Insert some initial data for target muscles
INSERT INTO target_muscles (name, body_part) VALUES
('Biceps', 'Arms'),
('Quadriceps', 'Legs'),
('Pectoralis Major', 'Chest'),
('Latissimus Dorsi', 'Back'),
('Deltoids', 'Shoulders'),
('Abdominals', 'Core');