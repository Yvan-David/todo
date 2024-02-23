-- Create a new database
CREATE DATABASE IF NOT EXISTS todo;
USE todo;

-- Create a table to store posts
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0
);
