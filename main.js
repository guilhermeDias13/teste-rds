const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv/config');

console.log(process.env.DB_PASS)
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA
});

console.log({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA
})
// Define the model
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

// Create operation
async function createUser() {
  try {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Created user:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Read operation
async function getAllUsers() {
  try {
    const users = await User.findAll();
    console.log('All users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Main execution
async function main() {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Connected to the database');

    // Perform operations
    await createUser();
    await getAllUsers();

    // Close the connection
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
