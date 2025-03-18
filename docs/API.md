# InnTouch API Documentation

This document provides comprehensive details on all the InnTouch API endpoints, including request/response formats, authentication requirements, and error handling.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://api.inntouch.app/api`

## Authentication

All API endpoints (except `/auth/login`) require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Authentication Endpoints

#### POST /auth/login

Authenticates a user and returns a JWT token.

**Request:**
```json
{
  "email": "manager@property.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400,
  "user": {
    "id": "user_id",
    "email": "manager@property.com",
    "role": "manager"
  }
}
```

## Guest Management Endpoints

### POST /checkin

Processes a guest check-in.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "documents": ["url_to_document1", "url_to_document2"],
  "reservationId": "res_123456",
  "estimatedArrival": "2023-09-15T15:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "guestId": "guest_id",
  "message": "Check-in successful"
}
```

### POST /checkout

Processes a guest check-out.

**Request:**
```json
{
  "guestId": "guest_id",
  "checkOutTime": "2023-09-20T11:00:00Z",
  "feedback": {
    "rating": 4,
    "comment": "Great stay!"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Check-out successful"
}
```

### GET /guests

Retrieves a list of guests.

**Query Parameters:**
- `status`: Filter by status (checked-in, checked-out, all)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response:**
```json
{
  "guests": [
    {
      "id": "guest_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "status": "checked-in",
      "checkInTime": "2023-09-15T15:30:00Z",
      "reservationId": "res_123456"
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20
}
```

## Room Service Endpoints

### GET /room-service/menu

Retrieves the room service menu.

**Response:**
```json
{
  "categories": [
    {
      "id": "cat_1",
      "name": "Breakfast",
      "items": [
        {
          "id": "item_1",
          "name": "Continental Breakfast",
          "description": "Croissant, jam, coffee",
          "price": 15.99,
          "imageUrl": "url_to_image"
        }
      ]
    }
  ]
}
```

### POST /room-service/order

Places a room service order.

**Request:**
```json
{
  "guestId": "guest_id",
  "items": [
    {
      "itemId": "item_1",
      "quantity": 2,
      "notes": "No sugar in coffee"
    }
  ],
  "deliveryTime": "2023-09-16T08:30:00Z",
  "roomNumber": "101"
}
```

**Response:**
```json
{
  "orderId": "order_id",
  "total": 31.98,
  "estimatedDelivery": "2023-09-16T08:30:00Z",
  "paymentIntent": {
    "id": "pi_123456",
    "clientSecret": "pi_123456_secret_789"
  }
}
```

### GET /room-service/orders/{guestId}

Retrieves all orders for a specific guest.

**Response:**
```json
{
  "orders": [
    {
      "id": "order_id",
      "items": [
        {
          "name": "Continental Breakfast",
          "quantity": 2,
          "price": 15.99
        }
      ],
      "total": 31.98,
      "status": "delivered",
      "orderedAt": "2023-09-16T07:45:00Z",
      "deliveredAt": "2023-09-16T08:32:00Z"
    }
  ]
}
```

## Amenities Endpoints

### GET /amenities

Retrieves all available amenities.

**Response:**
```json
{
  "amenities": [
    {
      "id": "amenity_1",
      "name": "Spa Treatment",
      "description": "Relaxing full-body massage",
      "price": 89.99,
      "duration": 60,
      "imageUrl": "url_to_image"
    }
  ]
}
```

### GET /amenities/{amenityId}/availability

Retrieves availability for a specific amenity.

**Query Parameters:**
- `date`: Date to check availability (YYYY-MM-DD)

**Response:**
```json
{
  "amenityId": "amenity_1",
  "date": "2023-09-16",
  "slots": [
    {
      "startTime": "2023-09-16T10:00:00Z",
      "endTime": "2023-09-16T11:00:00Z",
      "available": true
    },
    {
      "startTime": "2023-09-16T11:00:00Z",
      "endTime": "2023-09-16T12:00:00Z",
      "available": false
    }
  ]
}
```

### POST /amenities/book

Books an amenity.

**Request:**
```json
{
  "guestId": "guest_id",
  "amenityId": "amenity_1",
  "startTime": "2023-09-16T10:00:00Z",
  "participants": 1,
  "notes": "Prefer female therapist"
}
```

**Response:**
```json
{
  "bookingId": "booking_id",
  "amenity": "Spa Treatment",
  "startTime": "2023-09-16T10:00:00Z",
  "endTime": "2023-09-16T11:00:00Z",
  "total": 89.99,
  "paymentIntent": {
    "id": "pi_123456",
    "clientSecret": "pi_123456_secret_789"
  }
}
```

## Communication Endpoints

### POST /chat

Sends a message to the AI chat agent or staff.

**Request:**
```json
{
  "guestId": "guest_id",
  "message": "What time is breakfast served?",
  "channel": "chat"
}
```

**Response:**
```json
{
  "messageId": "message_id",
  "response": "Breakfast is served from 7:00 AM to 10:30 AM in the main restaurant.",
  "isAIResponse": true,
  "timestamp": "2023-09-16T06:45:00Z"
}
```

### GET /chat/history/{guestId}

Retrieves chat history for a specific guest.

**Response:**
```json
{
  "messages": [
    {
      "id": "message_id",
      "text": "What time is breakfast served?",
      "sender": "guest",
      "timestamp": "2023-09-16T06:45:00Z"
    },
    {
      "id": "message_id_2",
      "text": "Breakfast is served from 7:00 AM to 10:30 AM in the main restaurant.",
      "sender": "ai",
      "timestamp": "2023-09-16T06:45:05Z"
    }
  ]
}
```

## Analytics Endpoints

### GET /analytics/overview

Retrieves overview analytics data.

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)

**Response:**
```json
{
  "guestStats": {
    "checkins": 45,
    "checkouts": 38
  },
  "orderStats": {
    "total": 67,
    "revenue": 1245.67
  },
  "amenityStats": {
    "bookings": 29,
    "revenue": 2389.45
  },
  "chatStats": {
    "messages": 156,
    "aiResponses": 134,
    "humanResponses": 22
  }
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {} // Optional additional details
}
```

### Common Error Codes

- `AUTHENTICATION_FAILED`: Invalid or expired JWT token
- `VALIDATION_ERROR`: Invalid request parameters
- `NOT_FOUND`: Requested resource not found
- `PAYMENT_FAILED`: Payment processing failed
- `BOOKING_CONFLICT`: Requested amenity/slot already booked
- `INTERNAL_ERROR`: Server-side error

## Rate Limiting

API requests are limited to 100 requests per minute per IP address. When the limit is exceeded, a 429 Too Many Requests response is returned:

```json
{
  "error": true,
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests, please try again later",
  "details": {
    "retryAfter": 45 // Seconds until the rate limit resets
  }
}
```

## Webhooks

InnTouch provides webhooks for real-time notifications of events:

- `/webhooks/stripe`: Handles Stripe payment events
- `/webhooks/cloudbeds`: Processes Cloudbeds reservation updates

Webhooks require appropriate secret keys for authentication. 