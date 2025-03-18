# InnTouch Setup Guide

This guide provides step-by-step instructions for setting up the InnTouch application for development, testing, and deployment.

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local installation for development)
- Git

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/inntouch.git
cd inntouch
```

### 2. Environment Configuration

Create `.env` files for both backend and frontend:

#### Backend (.env in /backend)

```
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/inntouch
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/inntouch

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1d

# External Services
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDBEDS_API_KEY=...
CLOUDBEDS_API_SECRET=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
```

#### Frontend (.env in /frontend)

```
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Install Dependencies

Install dependencies for both backend and frontend:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 4. Database Setup

For local development, start MongoDB:

```bash
# Start MongoDB (command may vary depending on your installation)
mongod --dbpath=/data
```

Alternatively, use MongoDB Atlas by updating the MONGO_URI in your backend .env file.

### 5. Run Development Servers

Start both backend and frontend development servers:

```bash
# Start backend (from /backend directory)
npm run dev

# Start frontend (from /frontend directory in a new terminal)
npm start
```

The application should now be running at:
- Backend API: http://localhost:3000
- Frontend: http://localhost:3000 (React default)

## Project Structure

```
inntouch/
├── frontend/                   # React PWA
│   ├── public/                 # Static assets
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/              # Page components
│       ├── services/           # API services
│       ├── utils/              # Utility functions
│       ├── App.js              # Main App component
│       └── index.js            # Entry point
├── backend/                    # Node.js with Express
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   ├── controllers/            # Route controllers
│   ├── services/               # Business logic
│   ├── middleware/             # Express middleware
│   ├── utils/                  # Utility functions
│   ├── config/                 # Configuration
│   └── server.js               # Entry point
├── docs/                       # Documentation
└── .env                        # Environment variables
```

## External Services Setup

### MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database access (username/password)
4. Add your IP address to the network access list
5. Get your connection string and add it to your backend .env file

### Stripe

1. Create a [Stripe](https://stripe.com) account
2. Obtain API keys from the Stripe Dashboard
3. Add the secret key to your backend .env file
4. Add the publishable key to your frontend .env file
5. Set up webhooks in the Stripe Dashboard:
   - Endpoint: `https://your-api.com/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Cloudbeds

1. Create a [Cloudbeds](https://www.cloudbeds.com) account
2. Register for API access at [Cloudbeds API](https://www.cloudbeds.com/api/)
3. Create an application to get your API key and secret
4. Add the credentials to your backend .env file

### Twilio

1. Create a [Twilio](https://www.twilio.com) account
2. Get your Account SID and Auth Token from the Twilio Dashboard
3. Add the credentials to your backend .env file
4. Purchase a phone number for sending SMS

## Testing

Run tests for both backend and frontend:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Building for Production

### Backend

```bash
cd backend
npm run build
```

### Frontend

```bash
cd frontend
npm run build
```

The built frontend will be in the `frontend/build` directory, ready to be deployed to a hosting service like Netlify.

## Deployment

### Option 1: Heroku & Netlify

#### Backend (Heroku)

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Log in to Heroku: `heroku login`
3. Create a new Heroku app: `heroku create inntouch-api`
4. Add environment variables in the Heroku Dashboard
5. Deploy: `git subtree push --prefix backend heroku main`

#### Frontend (Netlify)

1. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/)
2. Log in to Netlify: `netlify login`
3. Build the frontend: `cd frontend && npm run build`
4. Deploy: `netlify deploy --prod --dir=build`

### Option 2: AWS

For a more scalable solution, consider deploying to AWS:

- Backend: AWS Elastic Beanstalk or ECS
- Frontend: AWS S3 + CloudFront
- Database: MongoDB Atlas or AWS DocumentDB

## Common Issues and Troubleshooting

### CORS Issues
If experiencing CORS issues during development, ensure your backend has the correct CORS configuration:

```javascript
// In backend/app.js or server.js
const cors = require('cors');
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-frontend-domain.com' 
    : 'http://localhost:3000'
}));
```

### MongoDB Connection Issues
If unable to connect to MongoDB:
1. Check if the MongoDB service is running
2. Verify the connection string in your .env file
3. Make sure your IP address is allowed in the MongoDB Atlas Network Access settings

### Environment Variables Not Loading
If environment variables are not being recognized:
1. Ensure .env files are in the correct locations
2. Restart your development servers
3. Verify you're using `dotenv` correctly in your application

## Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [Cloudbeds API Documentation](https://api.cloudbeds.com/docs/)
- [Twilio API Documentation](https://www.twilio.com/docs/api) 