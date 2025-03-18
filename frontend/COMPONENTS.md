# Frontend Component Documentation

This document provides documentation for the React components used in the InnTouch application.

## Component Structure

The components are organized in the following directory structure:

```
frontend/src/components/
├── Layout.js            # Main layout wrapper component
├── ProtectedRoute.js    # Route protection for authenticated users
├── Analytics/           # Components related to analytics and reporting
├── Chat/                # Components for guest-staff communication
├── RoomService/         # Components for room service functionality
└── Amenities/           # Components for hotel amenities
```

## Core Components

### Layout.js

**Purpose:** Provides the main layout structure for the application including navigation, headers, and footers.

**Props:**
- `children` - React nodes to be rendered within the layout
- `hideNav` - (Optional) Boolean to hide navigation when true

**Usage Example:**
```jsx
import Layout from '../components/Layout';

const HomePage = () => (
  <Layout>
    <h1>Welcome to InnTouch</h1>
    <p>Your content here</p>
  </Layout>
);
```

### ProtectedRoute.js

**Purpose:** Protects routes that require authentication, redirecting unauthorized users.

**Props:**
- `component` - The component to render if authenticated
- `...rest` - Additional props to pass to the Route component

**Usage Example:**
```jsx
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';

<ProtectedRoute path="/dashboard" component={Dashboard} />
```

## Feature-specific Components

Each subdirectory contains components related to specific features of the application. Refer to the individual component files for detailed documentation on their props, state, and usage.

### Analytics Components

Components for displaying charts, statistics, and other analytics data.

### Chat Components

Components for real-time communication between guests and hotel staff.

### RoomService Components

Components related to room service ordering and fulfillment.

### Amenities Components

Components for displaying and booking hotel amenities.

## Component Guidelines

When creating new components:

1. Follow the established naming conventions (PascalCase for components)
2. Document props using JSDoc comments
3. Keep components focused on a single responsibility
4. Create reusable components when patterns are repeated
5. Use TypeScript interfaces to define prop types

## Best Practices

- Use functional components with hooks instead of class components
- Keep components small and focused (under 250 lines)
- Use the Context API for state that needs to be shared across multiple components
- Follow accessibility guidelines for all user interface elements 