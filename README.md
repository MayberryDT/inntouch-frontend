# InnTouch - Hotel Guest Experience Platform

InnTouch is a mobile-first web application designed to enhance the hotel guest experience by providing a comprehensive suite of digital services. The platform streamlines guest interactions and provides convenient access to hotel services.

## ⚠️ Important: Repository Structure
This repository is part of a larger project structure. Please note:

1. **Main Project Repository**: https://github.com/MayberryDT/InnTouch
   - Contains overall project documentation
   - Houses both frontend and backend as submodules
   - Used for project-wide issues and documentation

2. **Frontend Repository (You Are Here)**: https://github.com/MayberryDT/inntouch-frontend
   - Contains all React frontend code
   - Work directly in this repository for frontend development
   - All frontend-related issues and PRs should be created here

3. **Backend Repository**: https://github.com/MayberryDT/inntouch-backend
   - Contains all Node.js backend code
   - Referenced as a submodule in the main repository

### 🚨 Development Workflow
To avoid git conflicts and ensure proper development:

1. **Always work in the correct repository:**
   ```bash
   # For frontend development:
   git clone https://github.com/MayberryDT/inntouch-frontend.git
   cd inntouch-frontend
   
   # DO NOT work in the main repository's frontend folder
   # as it's a submodule and will cause git conflicts
   ```

2. **Direct to Master Workflow:**
   - All changes should be committed directly to the master branch
   - The master branch auto-deploys to Netlify
   ```bash
   # Make your changes
   git add .
   git commit -m "Your descriptive commit message"
   
   # Push changes to master
   git push origin master
   ```

3. **Commit Message Format:**
   ```bash
   # Format: type(scope): description
   git commit -m "feat(auth): add Firebase error handling"
   git commit -m "fix(ui): correct button alignment"
   git commit -m "docs: update API documentation"
   ```

   Types:
   - feat: New feature
   - fix: Bug fix
   - docs: Documentation changes
   - style: Code style changes (formatting, etc)
   - refactor: Code refactoring
   - test: Adding or updating tests
   - chore: Maintenance tasks

## Project Overview

InnTouch aims to modernize the hotel guest experience by providing a unified platform for all guest services.

### Core Features

- **User Authentication**: Secure login system using JWT authentication via Firebase Auth
- **Digital Check-in/Checkout**: Streamlined check-in and checkout process
- **Room Service Ordering**: Digital menu and order tracking system
- **Amenities Booking**: Spa, gym, and other facility reservations
- **Chat System**: Real-time communication with staff and AI concierge
- **Local Attractions**: Recommendations and bookings for local activities

### Technology Stack

- React.js 18.2.0
- Material-UI (MUI) 5.15.6
- React Router DOM 6.21.3
- React Context API for state management
- Jest and React Testing Library for testing

## Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MayberryDT/inntouch-frontend.git
   cd inntouch-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start development server:
   ```bash
   npm start
   ```

### Testing

Run tests with:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Project Structure

```
inntouch-frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── auth/      # Authentication components
│   │   ├── common/    # Common UI components
│   │   └── ...
│   ├── contexts/      # React Context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── theme/         # MUI theme configuration
│   └── utils/         # Utility functions
├── public/            # Static files
└── docs/             # Documentation
```

## Contributing

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub

## Available Scripts

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or inquiries about this project, please contact [Your Name/Organization].

---

**Note**: This README is specific to the frontend repository. For overall project documentation, please refer to the [main project repository](https://github.com/MayberryDT/InnTouch). 