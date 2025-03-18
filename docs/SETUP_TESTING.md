# InnTouch Testing Environment Setup Guide

This document provides step-by-step instructions for setting up the InnTouch testing environment. Follow these instructions to get the application running locally for development and testing purposes.

## Prerequisites

- Node.js (v14+ recommended)
- npm (v6+ recommended)
- MongoDB Atlas account (or local MongoDB installation)
- Git

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/inntouch.git
cd inntouch
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1d

# External Services (to be configured later)
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLOUDBEDS_API_KEY=your_cloudbeds_api_key
CLOUDBEDS_API_SECRET=your_cloudbeds_api_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

Replace the MongoDB URI with your actual connection string.

#### Create Admin User

Create a script to add an admin user to the database:

```bash
mkdir -p src/scripts
```

Create a file `src/scripts/createAdminUser.js` with the following content:

```javascript
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
```

Run the script to create the admin user:

```bash
node src/scripts/createAdminUser.js
```

### 3. Frontend Setup

#### Install Dependencies

```bash
cd ../frontend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `frontend` directory with the following content:

```
REACT_APP_API_URL=http://localhost:3000/api
PORT=3001
```

#### Create Required Public Files

Create the public directory and required files:

```bash
mkdir -p public
```

Create `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="InnTouch - Hotel Guest Experience Platform"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>InnTouch</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

Create `public/manifest.json`:

```json
{
  "short_name": "InnTouch",
  "name": "InnTouch Guest Experience Platform",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

Create `public/robots.txt`:

```
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
```

Create placeholder image files:

```bash
touch public/favicon.ico public/logo192.png public/logo512.png
```

## Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on http://localhost:3000.

### 2. Start the Frontend Server

In a new terminal:

```bash
cd frontend
npm start
```

The frontend server will run on http://localhost:3001.

## Testing the Application

### Login Credentials

- **Email**: admin@inntouch.app
- **Password**: admin123

### Testing Features

1. **Check-in Process**:
   - Access http://localhost:3001/checkin
   - Fill out the form with guest details
   - Submit the form to create a new guest

2. **Check-out Process**:
   - Access http://localhost:3001/checkout
   - Enter a guest ID
   - Provide rating and feedback
   - Submit the form to check out a guest

3. **Admin Dashboard**:
   - Access http://localhost:3001/login
   - Log in with admin credentials
   - View the dashboard and guest management features

## Troubleshooting

### Port Already in Use

If you see an error like `EADDRINUSE: address already in use :::3000`, it means the port is already being used by another process. You can either:

1. Kill the process using the port:
   ```bash
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # On macOS/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

2. Change the port in the `.env` file and restart the server.

### Module Not Found Errors

If you encounter module not found errors, try:

1. Delete the `node_modules` folder and reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

### MongoDB Connection Issues

If you have trouble connecting to MongoDB:

1. Verify your connection string in the `.env` file
2. Ensure your IP address is whitelisted in MongoDB Atlas
3. Check that your username and password are correct

## Next Steps

After setting up the testing environment, you can:

1. Explore the codebase to understand the application structure
2. Make changes to the code and test them locally
3. Implement additional features as needed
4. Deploy the application to a production environment 