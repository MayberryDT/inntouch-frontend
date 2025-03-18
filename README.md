# InnTouch - Hotel Guest Experience Platform

InnTouch is a SaaS platform that enhances the guest experience for hotels and vacation rentals through digital check-in/out, room service ordering, and personalized communication.

## Week 1 Implementation (Completed)

This implementation includes:

- MongoDB Atlas connection setup
- Node.js Express backend with API endpoints for:
  - Authentication
  - Guest check-in
  - Guest check-out
  - Guest management
- React frontend with:
  - Authentication system
  - Public check-in/out forms
  - Staff dashboard
  - Guest management interface

## Key Features

- **Online Check-in/Check-out**: Paperless, remote process for guests
- **Guest Management**: Dashboard for property managers to view and manage guests
- **Authentication**: Secure login for staff members
- **Responsive Design**: Works on all devices

## Technical Stack

- **Frontend**: React with Material-UI
- **Backend**: Node.js with Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT-based authentication

## Getting Started

For detailed setup instructions, see [Setup Testing Guide](docs/SETUP_TESTING.md).

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Quick Start

1. Clone the repository
```
git clone https://github.com/yourusername/inntouch.git
cd inntouch
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

4. Configure environment variables
   - Update the MongoDB connection string in backend/.env
   - Set up other environment variables as needed

5. Start the backend server
```
cd backend
npm run dev
```

6. Start the frontend development server
```
cd frontend
npm start
```

7. Access the application
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## Login Credentials

- **Email**: admin@inntouch.app
- **Password**: admin123

## Documentation

- [Setup Testing Guide](docs/SETUP_TESTING.md) - Detailed setup instructions
- [API Documentation](docs/API.md) - API endpoints and usage
- [Architecture](docs/ARCHITECTURE.md) - System architecture overview

## Development Roadmap

### Week 1 (Completed)
- ✅ Set up MongoDB Atlas and connect backend
- ✅ Initialize React frontend and Node.js backend
- ✅ Build online check-in/out feature
- ✅ Create authentication system
- ✅ Implement guest management

### Week 2 (Upcoming)
- Implement room service ordering
- Build amenities booking system
- Integrate Stripe for payments
- Sync guest data with Cloudbeds API

### Week 3 (Upcoming)
- Add communication hub with AI chat agent
- Integrate Twilio for SMS notifications
- Build basic analytics dashboard
- Test end-to-end flows and fix bugs

## Contributors

- Your Name - Initial work

## License

This project is licensed under the MIT License - see the LICENSE file for details. 