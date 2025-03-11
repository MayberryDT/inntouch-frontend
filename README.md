# InnTouch - Hotel Guest Experience Platform

InnTouch is a mobile-first web application designed to enhance the hotel guest experience by providing a comprehensive suite of digital services. The platform streamlines guest interactions and provides convenient access to hotel services.

## Project Overview

InnTouch aims to modernize the hotel guest experience by providing a unified platform for all guest services. This repository contains the documentation and specifications for developing the InnTouch prototype.

### Core Features

- **User Authentication**: Secure login system using JWT authentication via Firebase Auth
- **Digital Check-in/Checkout**: Streamlined check-in and checkout process
- **Room Service Ordering**: Digital menu and order tracking system
- **Amenities Booking**: Spa, gym, and other facility reservations
- **Chat System**: Real-time communication with staff and AI concierge
- **Local Attractions**: Recommendations and bookings for local activities

### Technology Stack

#### Frontend
- React.js
- Material-UI (MUI)
- React Context API for state management
- Netlify for hosting

#### Backend
- Node.js
- Express.js
- Firebase Authentication (JWT)
- MongoDB Atlas (Database)
- WebSocket for real-time features

## Documentation

This repository contains the following documentation:

- [Specification Document](./docs/specification.md): Detailed project requirements and specifications
- [Technical Architecture](./docs/technical_architecture.md): System design and architecture details
- [Development Roadmap](./docs/development_roadmap.md): Two-week development plan with daily tasks
- [Project Structure](./docs/project_structure.md): Recommended project structure for frontend and backend
- [UI/UX Guidelines](./docs/ui_ux_guidelines.md): Design principles and guidelines for the application
- [Project Board Setup](./docs/project_board_setup.md): Instructions for project boards and issue tracking

## Project Structure

The project will be organized into two main repositories:

1. **InnTouch-Frontend**: React.js application
2. **InnTouch-Backend**: Node.js/Express.js API

## Development Setup

### GitHub Setup

The project uses GitHub for version control and project management. The repositories are:

- Frontend: https://github.com/MayberryDT/inntouch-frontend
- Backend: https://github.com/MayberryDT/inntouch-backend

### Project Boards

We use markdown-based project boards for task tracking instead of GitHub Projects. These boards are located in the `docs/project_boards` directory:

- [Frontend Development Board](./docs/project_boards/frontend_board.md)
- [Backend Development Board](./docs/project_boards/backend_board.md)
- [Project Boards README](./docs/project_boards/README.md) (contains usage instructions)

Benefits of our markdown-based approach:
- Version-controlled task tracking
- Offline access to project boards
- Simple integration with documentation
- No need for additional GitHub permissions

To use the project boards:
1. Navigate to the appropriate board file
2. Update tasks as you work on them
3. Commit and push your changes

For more details on project setup, see [Project Board Setup](./docs/project_board_setup.md).

## Development Timeline

The development is structured into two phases:

### Phase 1 (Week 1)
- Project setup and planning
- Authentication and user management
- Digital check-in/checkout system
- Room service and amenities booking

### Phase 2 (Week 2)
- Chat system implementation
- Local attractions integration
- Testing and refinement
- Final deployment

## Getting Started (Future Implementation)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Firebase account

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/your-org/inntouch-frontend.git
cd inntouch-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm start
```

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-org/inntouch-backend.git
cd inntouch-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## Deployment

### Frontend Deployment
The frontend will be deployed to Netlify with continuous deployment from the GitHub repository.

### Backend Deployment
The backend will be deployed to a platform to be determined (potentially Heroku or Render).

## Contributing

This project is currently in the specification and planning phase. Contribution guidelines will be established once development begins.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or inquiries about this project, please contact [Your Name/Organization].

---

This README provides an overview of the InnTouch project. For detailed specifications and development plans, please refer to the documentation in the `docs` directory. 