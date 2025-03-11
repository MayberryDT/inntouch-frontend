# Project Structure

## Overview

The InnTouch project follows a modular structure that separates concerns and promotes code reusability. This document outlines the organization of both frontend and backend codebases.

## Frontend Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── booking/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── service/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── chat/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   ├── attractions/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   └── common/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── utils/
│   │       └── types/
│   ├── core/
│   │   ├── api/
│   │   ├── config/
│   │   ├── theme/
│   │   └── utils/
│   ├── assets/
│   │   ├── styles/
│   │   ├── images/
│   │   └── icons/
│   ├── App.tsx
│   ├── index.tsx
│   └── routes.tsx
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── tsconfig.json
└── README.md
```

## Backend Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── types/
│   │   ├── booking/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── types/
│   │   ├── service/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── types/
│   │   ├── chat/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── types/
│   │   ├── attractions/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── types/
│   │   └── common/
│   │       ├── middleware/
│   │       ├── utils/
│   │       └── types/
│   ├── core/
│   │   ├── config/
│   │   ├── database/
│   │   ├── logger/
│   │   └── types/
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── tsconfig.json
└── README.md
```

## Module Details

### Authentication Module
- User registration and login
- Profile management
- Session handling
- JWT authentication
- Password reset

### Booking Module
- Check-in process
- Room selection
- Express checkout
- Payment processing
- Receipt generation

### Service Module
- Room service ordering
- Amenities booking
- Order tracking
- Inventory management
- Payment integration

### Chat Module
- Real-time messaging
- AI concierge
- File sharing
- Message history
- Staff routing

### Attractions Module
- Local attractions
- Tour bookings
- Reviews system
- Map integration
- Transportation

### Common Module
- Shared components
- Utility functions
- Type definitions
- Constants
- Helpers

## Core Components

### Frontend Core
- API client
- Configuration
- Theme system
- Route management
- State management
- Error handling

### Backend Core
- Server setup
- Database connection
- Logging system
- Error handling
- Configuration
- Middleware

## Testing Structure

### Unit Tests
- Component tests
- Service tests
- Utility tests
- Model tests

### Integration Tests
- API tests
- Database tests
- Service integration
- Module integration

### E2E Tests
- User flows
- Critical paths
- Performance tests
- Security tests

## Asset Organization

### Frontend Assets
- Images
- Icons
- Styles
- Fonts
- Static files

### Backend Assets
- Templates
- Static files
- Configuration files
- Documentation

## Configuration Files

### Frontend Config
- Environment variables
- Build configuration
- TypeScript config
- Testing setup
- Linting rules

### Backend Config
- Environment variables
- Database config
- Server settings
- Logging config
- Security settings

## Documentation

### Code Documentation
- JSDoc comments
- Type definitions
- README files
- API documentation
- Component documentation

### Project Documentation
- Setup guide
- Architecture docs
- API specs
- Testing guide
- Deployment guide

## Build and Deploy

### Build Process
- Source compilation
- Asset optimization
- Bundle generation
- Environment config
- Source maps

### Deployment
- Build artifacts
- Environment setup
- Database migrations
- Configuration files
- Deployment scripts

## Version Control

### Git Structure
- Feature branches
- Release branches
- Development branch
- Main branch
- Tags

### Git Hooks
- Pre-commit
- Post-commit
- Pre-push
- Post-merge

## Dependencies

### Frontend Dependencies
- React
- Material-UI
- TypeScript
- WebSocket client
- Testing libraries

### Backend Dependencies
- Node.js
- Express
- MongoDB
- WebSocket
- Testing frameworks

## Development Tools

### Code Quality
- ESLint
- Prettier
- TypeScript
- Jest
- Testing Library

### Development
- VS Code
- Chrome DevTools
- Postman
- MongoDB Compass
- Git

## Conclusion

This project structure provides a clear organization for the InnTouch application, promoting maintainability, scalability, and code reuse. The modular approach allows for independent development and testing of features while maintaining a cohesive application architecture. 