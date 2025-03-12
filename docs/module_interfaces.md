# Module Interfaces

## Overview

This document defines the interfaces and integration points between different modules in the InnTouch application. Each module exposes specific interfaces for interaction while maintaining encapsulation of its internal implementation.

## Core Interfaces

### Authentication Module

#### Frontend Interface
```typescript
interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(userData: RegistrationData): Promise<AuthResponse>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getCurrentUser(): User | null;
  updateProfile(data: ProfileUpdateData): Promise<User>;
}

interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
}
```

#### Backend Interface
```typescript
interface AuthController {
  register(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
  updateProfile(req: Request, res: Response): Promise<void>;
}
```

### Check-in/Checkout Module

#### Frontend Interface
```typescript
interface CheckInService {
  startCheckIn(reservationId: string): Promise<CheckInSession>;
  submitCheckIn(data: CheckInData): Promise<CheckInResult>;
  startCheckOut(roomId: string): Promise<CheckOutSession>;
  submitCheckOut(data: CheckOutData): Promise<CheckOutResult>;
  getReceipt(bookingId: string): Promise<Receipt>;
}

interface CheckInContext {
  checkInStatus: CheckInStatus;
  checkOutStatus: CheckOutStatus;
  currentStep: number;
  loading: boolean;
  error: Error | null;
  proceedToNextStep: () => void;
  goToPreviousStep: () => void;
}
```

#### Backend Interface
```typescript
interface CheckInController {
  initiateCheckIn(req: Request, res: Response): Promise<void>;
  processCheckIn(req: Request, res: Response): Promise<void>;
  initiateCheckOut(req: Request, res: Response): Promise<void>;
  processCheckOut(req: Request, res: Response): Promise<void>;
  generateReceipt(req: Request, res: Response): Promise<void>;
}
```

### Service Module

#### Frontend Interface
```typescript
interface ServiceBookingService {
  getServices(): Promise<Service[]>;
  checkAvailability(serviceId: string, date: Date): Promise<TimeSlot[]>;
  bookService(bookingData: ServiceBookingData): Promise<Booking>;
  cancelBooking(bookingId: string): Promise<void>;
  getBookingHistory(): Promise<Booking[]>;
}

interface RoomServiceContext {
  cart: CartItem[];
  orders: Order[];
  loading: boolean;
  error: Error | null;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  placeOrder: () => Promise<Order>;
}
```

#### Backend Interface
```typescript
interface ServiceController {
  listServices(req: Request, res: Response): Promise<void>;
  getAvailability(req: Request, res: Response): Promise<void>;
  createBooking(req: Request, res: Response): Promise<void>;
  cancelBooking(req: Request, res: Response): Promise<void>;
  getBookings(req: Request, res: Response): Promise<void>;
}
```

### Chat Module

#### Frontend Interface
```typescript
interface ChatService {
  connect(): Promise<void>;
  disconnect(): void;
  sendMessage(message: ChatMessage): Promise<void>;
  getHistory(conversationId: string): Promise<ChatMessage[]>;
  startAIChat(): Promise<void>;
  uploadFile(file: File): Promise<string>;
}

interface ChatContext {
  messages: ChatMessage[];
  conversations: Conversation[];
  activeConversation: string | null;
  loading: boolean;
  error: Error | null;
  sendMessage: (content: string) => Promise<void>;
  switchConversation: (conversationId: string) => void;
}
```

#### Backend Interface
```typescript
interface ChatController {
  handleConnection(socket: WebSocket): void;
  handleDisconnection(socket: WebSocket): void;
  handleMessage(socket: WebSocket, message: any): void;
  getMessageHistory(req: Request, res: Response): Promise<void>;
  handleFileUpload(req: Request, res: Response): Promise<void>;
}
```

### Attractions Module

#### Frontend Interface
```typescript
interface AttractionsService {
  getAttractions(filters: AttractionFilters): Promise<Attraction[]>;
  getDetails(attractionId: string): Promise<AttractionDetails>;
  bookAttraction(bookingData: AttractionBooking): Promise<Booking>;
  getReviews(attractionId: string): Promise<Review[]>;
  submitReview(review: ReviewData): Promise<Review>;
}

interface AttractionsContext {
  attractions: Attraction[];
  selectedAttraction: AttractionDetails | null;
  loading: boolean;
  error: Error | null;
  selectAttraction: (id: string) => Promise<void>;
  filterAttractions: (filters: AttractionFilters) => Promise<void>;
}
```

#### Backend Interface
```typescript
interface AttractionsController {
  listAttractions(req: Request, res: Response): Promise<void>;
  getAttractionDetails(req: Request, res: Response): Promise<void>;
  createBooking(req: Request, res: Response): Promise<void>;
  getReviews(req: Request, res: Response): Promise<void>;
  createReview(req: Request, res: Response): Promise<void>;
}
```

## Common Types

### User Types
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferences?: UserPreferences;
}

interface UserPreferences {
  language: string;
  currency: string;
  notifications: NotificationSettings;
  theme: 'light' | 'dark';
}
```

### Booking Types
```typescript
interface Booking {
  id: string;
  userId: string;
  type: BookingType;
  status: BookingStatus;
  startTime: Date;
  endTime: Date;
  payment?: Payment;
  metadata: Record<string, any>;
}

enum BookingType {
  ROOM = 'room',
  SERVICE = 'service',
  ATTRACTION = 'attraction'
}
```

### Service Types
```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: Money;
  duration: number;
  availability: Availability[];
}

interface TimeSlot {
  startTime: Date;
  endTime: Date;
  available: boolean;
}
```

### Chat Types
```typescript
interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: MessageType;
  metadata?: Record<string, any>;
}

interface Conversation {
  id: string;
  participants: string[];
  type: ConversationType;
  lastMessage?: ChatMessage;
  unreadCount: number;
}
```

### Attraction Types
```typescript
interface Attraction {
  id: string;
  name: string;
  description: string;
  location: Location;
  category: AttractionCategory;
  price: Money;
  rating: number;
  images: string[];
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  content: string;
  timestamp: Date;
  images?: string[];
}
```

## Event Types

### System Events
```typescript
interface SystemEvent {
  type: SystemEventType;
  timestamp: Date;
  metadata: Record<string, any>;
}

enum SystemEventType {
  USER_LOGIN = 'user.login',
  USER_LOGOUT = 'user.logout',
  BOOKING_CREATED = 'booking.created',
  BOOKING_UPDATED = 'booking.updated',
  BOOKING_CANCELLED = 'booking.cancelled',
  MESSAGE_SENT = 'message.sent',
  ERROR_OCCURRED = 'error.occurred'
}
```

## Error Types

```typescript
interface AppError extends Error {
  code: ErrorCode;
  details?: Record<string, any>;
}

enum ErrorCode {
  AUTHENTICATION_FAILED = 'auth/failed',
  INVALID_INPUT = 'validation/invalid',
  NOT_FOUND = 'resource/not-found',
  PERMISSION_DENIED = 'auth/permission-denied',
  SERVICE_UNAVAILABLE = 'service/unavailable'
}
```

## Integration Guidelines

1. All module interactions must use defined interfaces
2. Events should be used for cross-module communication
3. Error handling must use standard error types
4. Type safety must be maintained across boundaries
5. Versioning should be considered for interface changes

## Documentation Requirements

1. Interface changes must be documented
2. Breaking changes require migration guide
3. Examples should be provided for common use cases
4. Error scenarios must be documented
5. Performance implications should be noted

## Testing Requirements

1. Interface contracts must be tested
2. Integration tests must verify boundaries
3. Error scenarios must be covered
4. Performance benchmarks should be included
5. Cross-module flows must be validated

## Conclusion

These interface definitions provide a contract between modules in the InnTouch application. They should be treated as a living document and updated as the application evolves. 