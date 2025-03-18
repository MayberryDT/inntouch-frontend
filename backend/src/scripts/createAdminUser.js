const mongoose = require('mongoose');
const path = require('path');
const User = require('../models/User');
const crypto = require('crypto');
const readline = require('readline');

// Get environment variables from the root .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Setup readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected');
  
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@inntouch.app' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      rl.close();
      process.exit(0);
    }
    
    // Prompt for admin password or generate a secure one
    rl.question('Enter admin password (leave empty to generate secure password): ', async (password) => {
      let adminPassword;
      
      if (!password) {
        // Generate a secure random password
        adminPassword = crypto.randomBytes(12).toString('hex');
        console.log(`Generated secure password: ${adminPassword}`);
      } else {
        adminPassword = password;
      }
      
      // Create admin user
      const admin = await User.create({
        name: 'Admin User',
        email: 'admin@inntouch.app',
        password: adminPassword,
        role: 'admin'
      });
      
      console.log('Admin user created successfully');
      console.log('Email: admin@inntouch.app');
      
      rl.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    rl.close();
    process.exit(1);
  }
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  rl.close();
  process.exit(1);
}); 