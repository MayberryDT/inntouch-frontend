# InnTouch Technical Architecture

## System Architecture Overview

InnTouch follows a modern microservices architecture pattern with a clear separation between frontend and backend components. The architecture is designed for scalability, maintainability, and ease of deployment.

```
┌─────────────────┐     ┌──────────────────────────────────────┐
│                 │     │             Backend Services          │
│                 │     │                                      │
│    Frontend     │     │  ┌──────────┐  ┌──────────────────┐  │
│    React PWA    │◄────┼─►│  API     │◄─┤  Business Logic  │  │
│                 │     │  │  Gateway │  │                  │  │
│                 │     │  └──────────┘  └──────────────────┘  │
└─────────────────┘     │         │               │            │
                        │         ▼               ▼            │
                        │  ┌──────────┐   ┌───────────────┐    │
                        │  │ MongoDB  │   │ External APIs │    │
                        │  │ Atlas    │   │ Integration   │    │
                        │  └──────────┘   └───────────────┘    │
                        │                        │             │
                        └──────────────────────────────────────┘
                                                 │
                                                 ▼
                                     ┌───────────────────────┐
                                     │ Third-Party Services  │
                                     │ - Cloudbeds           │
                                     │ - Stripe              │
                                     │ - Twilio              │
                                     └───────────────────────┘
```

## Component Details

### Frontend (React PWA)
- **User Interface**: React components organized by feature
- **State Management**: React Context API or Redux for global state
- **API Communication**: Axios for RESTful API requests
- **PWA Features**: Service workers for offline capabilities
- **Responsive Design**: Mobile-first approach using CSS Grid/Flexbox

### Backend Services
- **API Gateway**: Express.js routing all client requests
- **Authentication**: JWT-based auth with secure HTTP-only cookies
- **Business Logic Services**:
  - Check-in/out Service
  - Room Service Order Processing
  - Amenities Booking Service
  - Communication Service
  - Analytics Service
- **Database Access Layer**: Mongoose ODM for MongoDB

### Data Storage
- **Primary Database**: MongoDB Atlas (Cloud-hosted)
- **Collections**:
  - guests
  - reservations
  - orders
  - amenities
  - messages
  - analytics

### External Integrations
- **Payment Processing**: Stripe API
- **Property Management**: Cloudbeds API
- **Communication**: Twilio API for SMS

## Data Flow

### Check-in Process
1. Guest receives booking confirmation with check-in link
2. Guest completes check-in form on PWA
3. Backend validates data and retrieves reservation from Cloudbeds
4. Data is stored in MongoDB
5. Confirmation is sent to guest via email/SMS

### Room Service Order
1. Guest browses menu and selects items
2. Order is submitted through the API
3. Payment is processed via Stripe
4. Order is stored in database
5. Notification is sent to property staff
6. Status updates are pushed to guest app

### Amenity Booking
1. Guest views available amenities and time slots
2. Guest selects desired amenity and time
3. Backend checks availability
4. Payment is processed via Stripe
5. Booking is confirmed and stored
6. Confirmation is sent to guest

## Deployment Architecture

### Development Environment
- Local development with Docker containers
- Database: MongoDB running locally or remote dev instance
- API keys: Development keys for Stripe, Twilio, etc.

### Staging Environment
- Heroku for backend deployment
- Netlify for frontend deployment
- MongoDB Atlas staging cluster
- Sandbox/test credentials for external services

### Production Environment
- Heroku for backend deployment with auto-scaling
- Netlify for frontend with CDN
- MongoDB Atlas production cluster with backups
- Production credentials for external services
- Monitoring: Sentry for error tracking, New Relic for performance

## Security Considerations

- HTTPS for all communications
- JWT with short expiration for authentication
- Input validation on all API endpoints
- CORS configuration to limit access
- Rate limiting to prevent abuse
- PCI compliance for payment processing
- Data encryption at rest in MongoDB Atlas
- Regular security audits and updates 