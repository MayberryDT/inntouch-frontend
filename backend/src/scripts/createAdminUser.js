const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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
      process.exit(0);
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@inntouch.app',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('Admin user created successfully');
    console.log('Email: admin@inntouch.app');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
}); 