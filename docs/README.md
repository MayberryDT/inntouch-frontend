# InnTouch: Guest Experience SaaS App Documentation

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technical Specifications](#technical-specifications)
  - [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Directory Structure](#directory-structure)
  - [API Endpoints](#api-endpoints-high-level)
- [Development Roadmap](#development-roadmap-fast-mvp-approach)
  - [Goal](#goal)
  - [Phases](#phases)
  - [Post-MVP Iterations](#post-mvp-iterations)
  - [Testing Plan](#testing-plan)
- [Detailed Feature Specifications](#detailed-feature-specs)
- [Integration Details](#integration-details)
- [Getting Started](#getting-started-in-cursor)

## Overview

**InnTouch** is a cloud-based SaaS application designed to enhance the guest experience for hotels and vacation rentals, competing with platforms like Duve. The platform focuses on simplicity, usability, and core guest-facing features, with property manager tools to streamline operations and increase revenue.

## Key Features

### 1. Online Check-in and Check-out
- Guests complete check-in/out remotely, submitting personal information and documents
- Reduces front-desk workload and improves efficiency
- Paperless process that saves time for both guests and staff

### 2. Guest App
- Progressive Web App (PWA) accessible on any device without downloads
- Displays reservation details, room service options, and amenities booking
- Intuitive interface designed for ease of use across all devices

### 3. Communication Hub
- Centralized messaging with an AI agent chat for automated responses
- Supports email and SMS (via integrations like Twilio)
- Enables seamless communication between guests and property staff

### 4. Room Service
- Guests can order food, drinks, or other services directly through the app
- Property managers receive orders in real-time
- Includes payment processing through Stripe integration

### 5. Amenities Booking System
- Guests book on-site amenities (e.g., spa, gym, pool) with available time slots
- Increases upsell opportunities and enhances guest experience
- Automated confirmation and reminders for bookings

### 6. Analytics and Reporting
- Basic dashboards for property managers to track guest activity and revenue
- Exportable CSV reports for further analysis
- Insights to help optimize services and increase revenue

## Technical Specifications

### Architecture
- **Cloud-Based SaaS**: Hosted on AWS/Heroku/Netlify for scalability
- **Frontend**: React PWA for a responsive, app-like experience
- **Backend**: Node.js with Express for API development
- **Database**: MongoDB Atlas for NoSQL storage
- **API Gateway**: Routes requests to services (e.g., check-in, room service)

### Tech Stack
- **Frontend**: React, Axios (for API calls)
- **Backend**: Node.js, Express, Mongoose (MongoDB ORM)
- **Database**: MongoDB Atlas
- **Integrations**: Cloudbeds API, Stripe SDK, Twilio (for SMS)
- **Deployment**: Heroku (backend), Netlify (frontend)

### Directory Structure
```
inntouch/
├── frontend/                   # React PWA
│   ├── public/                 # Static assets
│   └── src/
│       ├── components/         # Reusable UI (e.g., Form, ChatWindow)
│       ├── pages/              # CheckIn, RoomService, Amenities, etc.
│       └── services/           # API call functions
├── backend/                    # Node.js with Express
│   ├── models/                 # MongoDB schemas (Guest, Order, Booking)
│   ├── routes/                 # API endpoints
│   ├── services/               # Business logic (e.g., Stripe, Cloudbeds)
│   └── app.js                  # Main server file
├── docs/                       # This documentation
└── .env                        # Environment variables
```

### API Endpoints (High-Level)
- `POST /checkin`: Submit guest check-in data
- `POST /checkout`: Submit check-out request
- `POST /room-service/order`: Place a room service order
- `GET /amenities`: List available amenities
- `POST /amenities/book`: Book an amenity slot
- `POST /chat`: Send message to AI chat agent
- `GET /analytics`: Fetch analytics data

## Development Roadmap (Fast MVP Approach)

### Goal
Deliver an MVP in **3 weeks** with core functionality, then iterate based on feedback.

### Phases

#### Week 1: Setup and Core Structure
- **Tasks**:
  - Set up MongoDB Atlas and connect backend
  - Initialize React frontend and Node.js backend
  - Build online check-in/out feature
  - Deploy backend to Heroku, frontend to Netlify
- **Deliverable**: Guests can check in/out via the PWA, data stored in Atlas

#### Week 2: Room Service and Amenities
- **Tasks**:
  - Implement room service ordering (form + Stripe payment)
  - Build amenities booking system (availability + booking flow)
  - Integrate Stripe for payments
  - Sync guest data with Cloudbeds API
- **Deliverable**: Guests can order room service and book amenities, payments processed

#### Week 3: Communication and Analytics
- **Tasks**:
  - Add communication hub with AI chat agent (basic NLP via pre-built model, e.g., Dialogflow)
  - Integrate Twilio for SMS notifications
  - Build basic analytics dashboard (guest activity, revenue)
  - Test end-to-end flows and fix bugs
- **Deliverable**: Fully functional MVP with all core features

### Post-MVP Iterations
- **Week 4-6**: Add multi-language support, refine UI/UX, optimize performance
- **Week 7+**: Expand analytics, add more integrations (e.g., WhatsApp), scale based on user feedback

### Testing Plan
- **Unit Tests**: Test API endpoints and frontend components
- **Integration Tests**: Verify Cloudbeds, Stripe, and Twilio integrations
- **Manual Testing**: End-to-end flows (check-in to payment)
- **Tools**: Jest (unit), Postman (API), Cypress (optional E2E)

## Detailed Feature Specs

### 1. Online Check-in and Check-out
- **Frontend**: Form with name, email, and document upload (simulated as URLs)
- **Backend**: Save data to MongoDB Atlas (`guests` collection)
- **Cloudbeds Integration**: Pull reservation details via API to pre-fill guest info
- **Schema**:
  ```javascript
  {
    name: String,
    email: String,
    documents: [String],
    reservationId: String, // From Cloudbeds
    checkInTime: Date,
    checkOutTime: Date
  }
  ```

### 2. Guest App
- **Pages**: Home (reservation overview), Room Service, Amenities, Chat
- **PWA Features**: Offline mode (basic caching), installable on devices
- **Frontend**: React with service workers for PWA functionality

### 3. Communication Hub
- **AI Agent Chat**:
  - Basic NLP to handle common queries (e.g., "What's the Wi-Fi password?")
  - Fallback to human staff via email/SMS
  - Use Dialogflow or a simple custom rule-based system
- **SMS/Email**: Twilio for SMS, SendGrid for email (optional)
- **Schema**:
  ```javascript
  {
    guestId: String,
    message: String,
    channel: String, // 'chat', 'sms', 'email'
    timestamp: Date,
    isAIResponse: Boolean
  }
  ```

### 4. Room Service
- **Frontend**: Menu display with order form (item, quantity, notes)
- **Backend**: Process order, charge via Stripe, notify staff
- **Schema**:
  ```javascript
  {
    guestId: String,
    items: [{ name: String, price: Number, quantity: Number }],
    total: Number,
    status: String, // 'pending', 'confirmed', 'delivered'
    paymentIntentId: String // From Stripe
  }
  ```

### 5. Amenities Booking System
- **Frontend**: List amenities with available slots, booking form
- **Backend**: Manage availability, book slots, charge via Stripe
- **Schema**:
  ```javascript
  {
    amenityId: String,
    name: String,
    slots: [{ time: Date, isBooked: Boolean }],
    bookings: [{ guestId: String, time: Date, paymentIntentId: String }]
  }
  ```

### 6. Analytics and Reporting
- **Frontend**: Dashboard with charts (e.g., orders, bookings)
- **Backend**: Aggregate data from MongoDB, serve via API
- **Metrics**: Total orders, revenue, guest activity (check-ins, messages)

## Integration Details

### MongoDB Atlas
- **Setup**: Create a free cluster at [mongodb.com](https://www.mongodb.com/)
- **Connection**: Use connection string in `.env` (e.g., `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/inntouch`)
- **Collections**: `guests`, `orders`, `amenities`, `messages`

### Cloudbeds
- **API**: Use [Cloudbeds API](https://docs.cloudbeds.com/) to fetch reservations
- **Endpoint**: `GET /reservations` (requires OAuth2 token)
- **Fields**: Guest name, email, reservation ID, check-in/out dates

### Stripe
- **SDK**: Install `@stripe/stripe-js` (frontend) and `stripe` (backend)
- **Flow**:
  1. Frontend creates payment intent
  2. Backend confirms payment and updates order/booking status
- **Keys**: Store `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` in `.env`

## Sample Environment Variables (`.env`)
```
# Backend
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/inntouch
PORT=3000
STRIPE_SECRET_KEY=sk_test_...
TWILIO_SID=...
TWILIO_AUTH_TOKEN=...
CLOUDBEDS_API_KEY=...

# Frontend
REACT_APP_API_URL=http://localhost:3000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Getting Started in Cursor

1. **Create Project**: Open Cursor, create a new project named `inntouch`
2. **Import Files**:
   - Copy `frontend/` and `backend/` structures into respective folders
   - Add `.env` files with your keys
3. **Install Dependencies**:
   - Backend: `npm install express mongoose cors dotenv stripe twilio`
   - Frontend: `npm install react-scripts axios @stripe/stripe-js`
4. **Run Locally**:
   - Backend: `npm start` in `backend/`
   - Frontend: `npm start` in `frontend/`
5. **Build with Cursor**: Use Cursor's AI to refine code, add UI polish, or debug

## Notes
- This MVP avoids unnecessary complexity (e.g., no encryption setup yet) to meet the fast timeline
- The AI chat is simplified (rule-based or Dialogflow) for quick delivery; advanced NLP can come later
- Cloudbeds and Stripe integrations assume you have API keys—replace placeholders in `.env` 