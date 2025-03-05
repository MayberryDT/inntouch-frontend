# InnTouch Frontend

This is the frontend application for the InnTouch hotel guest experience platform.

## Project Overview

InnTouch is a mobile-first web application designed to enhance the hotel guest experience by providing digital services. The frontend focuses on two core features:
- Secure user authentication
- Digital room key

## Technology Stack

- React.js
- Material-UI (MUI)
- React Router for navigation
- Firebase Authentication
- ESLint and Prettier for code quality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MayberryDT/inntouch-frontend.git
cd inntouch-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at http://localhost:3000.

## Available Scripts

- `npm start` - Starts the development server
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run lint` - Runs ESLint to check for code issues
- `npm run lint:fix` - Runs ESLint and automatically fixes issues
- `npm run format` - Runs Prettier to format code

## Project Structure

```
inntouch-frontend/
├── public/             # Public assets
├── src/                # Source code
│   ├── components/     # Reusable components
│   │   ├── auth/       # Authentication components
│   │   ├── common/     # Common UI components
│   │   ├── key/        # Digital key components
│   │   ├── layout/     # Layout components
│   │   └── profile/    # User profile components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── theme/          # Material-UI theme
│   ├── utils/          # Utility functions
│   ├── App.js          # Main App component
│   ├── index.js        # Entry point
│   └── routes.js       # Application routes
├── .env.example        # Example environment variables
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
└── package.json        # Dependencies and scripts
```

## Code Quality

This project uses ESLint and Prettier to ensure code quality and consistent formatting.

### ESLint

ESLint is configured to enforce code quality rules. To run ESLint:

```bash
# Check for linting issues
npm run lint

# Fix automatically fixable issues
npm run lint:fix
```

### Prettier

Prettier is used for consistent code formatting. To format code:

```bash
# Format all files
npm run format
```

### VS Code Integration

For the best development experience, install the ESLint and Prettier extensions for VS Code:

1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Then add the following to your VS Code settings.json to enable format on save:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Development Guidelines

- Follow the UI/UX guidelines in the project documentation
- Use modular component architecture
- Implement responsive design for mobile-first approach
- Follow Material-UI design patterns

## Deployment

The frontend will be deployed to Netlify with continuous deployment from the GitHub repository.

### CI/CD Pipeline

This project uses GitHub Actions and Netlify for continuous integration and deployment:

1. Every push to the main branch triggers an automatic deployment
2. Pull requests trigger preview deployments
3. The CI/CD pipeline includes:
   - Code checkout
   - Dependencies installation
   - Linting
   - Building
   - Deployment to Netlify

### Netlify Configuration

The project includes a `netlify.toml` file that configures the build settings and redirects for the Netlify deployment.

### Environment Variables

The following environment variables need to be set in the GitHub repository secrets for the CI/CD pipeline to work:

- `NETLIFY_AUTH_TOKEN`: Your Netlify authentication token
- `NETLIFY_SITE_ID`: The ID of your Netlify site
- `REACT_APP_API_URL`: The URL of the backend API
- `REACT_APP_FIREBASE_API_KEY`: Firebase API key
- `REACT_APP_FIREBASE_AUTH_DOMAIN`: Firebase auth domain
- `REACT_APP_FIREBASE_PROJECT_ID`: Firebase project ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `REACT_APP_FIREBASE_APP_ID`: Firebase app ID

## License

This project is licensed under the MIT License - see the LICENSE file for details. 