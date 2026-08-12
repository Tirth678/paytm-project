# PayTM Clone - Digital Wallet Application

A full-stack digital wallet application built with **Node.js**, **Express**, **MongoDB**, and **React**. Users can sign up, manage their accounts, search for other users, and transfer money securely with atomic transactions.

---

## Features

### User Management
- User registration with email validation
- Secure login with JWT authentication
- Update user profile (name, password)
- Search users by name (partial matching)

### Account & Transactions
- Auto-create account with random balance (Rs.1 - Rs.10,000) on signup
- View account balance
- Transfer money to other users
- Atomic transactions with MongoDB sessions
- Insufficient balance validation

### Security
- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with auth middleware
- CORS enabled
- Input validation with Zod

---

## Tech Stack

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Security:** CORS

### Frontend
- **Framework:** React
- **Build Tool:** Vite

---

## Project Structure

```
paytm/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.js           # Environment config
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # Auth logic (signup, signin, update)
│   │   │   ├── user.controller.js   # User search
│   │   │   └── transection.controller.js  # Balance & transfers
│   │   ├── db/
│   │   │   └── db.js                # MongoDB connection
│   │   ├── middlewares/
│   │   │   └── middleware.js        # JWT auth middleware
│   │   ├── models/
│   │   │   ├── user.model.js        # User schema
│   │   │   └── account.model.js     # Account schema
│   │   └── routes/
│   │       └── user.routes.js       # API routes
│   ├── index.js                     # Server entry point
│   ├── .env                         # Environment variables
│   └── package.json
└── frontend/
    └── (React app)
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   cd paytm/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

---

## API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Authentication

#### 1. Sign Up
**POST** `/user/signup`

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "password123",
  "firstName": "Johnny",
  "lastName": "Doeson"
}
```

**Response:**
```json
{
  "message": "user created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Notes:**
- Creates user account
- Automatically creates wallet account with random balance (Rs.1 - Rs.10,000)
- Returns JWT token
- Names must be at least 6 characters

---

#### 2. Sign In
**POST** `/user/signin`

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 3. Update User Profile
**PUT** `/user/update`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "NewFirstName",
  "lastName": "NewLastName",
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Updated successfully"
}
```

**Notes:**
- All fields are optional
- Password is automatically hashed

---

### User Operations

#### 4. Search Users
**GET** `/user/bulk?filter=<search_term>`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```bash
GET /user/bulk?filter=john
```

**Response:**
```json
{
  "users": [
    {
      "username": "john.doe@gmail.com",
      "firstName": "Johnny",
      "lastName": "Doeson",
      "_id": "6a7b76bff08afd2546c6fbfb"
    }
  ]
}
```

**Notes:**
- Case-insensitive partial matching
- Searches in both firstName and lastName
- Passwords are excluded from response

---

### Account Operations

#### 5. Get Account Balance
**GET** `/account`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "balance": 5432.67
}
```

---

#### 6. Transfer Money
**POST** `/account/transfer`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amount": 100,
  "to": "6a7b76bff08afd2546c6fbfb"
}
```

**Response (Success):**
```json
{
  "message": "Transfer successful"
}
```

**Response (Insufficient Balance):**
```json
{
  "message": "Insufficient balance"
}
```

**Response (Invalid Account):**
```json
{
  "message": "Invalid account"
}
```

**Notes:**
- Uses MongoDB transactions for atomicity
- Validates sender balance before transfer
- Validates recipient account exists

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,      // Email, unique, lowercase
  password: String,      // Bcrypt hashed
  firstName: String,     // Min 6 chars
  lastName: String,      // Min 6 chars
}
```

### Accounts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,      // Reference to Users
  balance: Number        // Account balance
}
```

---

## Security Features

### Password Security
- Passwords hashed using **bcrypt** with 10 salt rounds
- Never stored or transmitted in plain text

### Authentication
- JWT tokens for stateless authentication
- Token includes userId payload
- Protected routes verify token via middleware

### Input Validation
- **Zod** schema validation for all inputs
- Email format validation
- Password strength requirements
- Field length restrictions

### Transaction Safety
- MongoDB sessions for atomic operations
- Rollback on failure
- Balance validation before transfer

---

## Testing

### Test with cURL

**1. Create User**
```bash
curl -X POST http://localhost:3001/api/v1/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "password123",
    "firstName": "TestUser",
    "lastName": "Account"
  }'
```

**2. Login**
```bash
curl -X POST http://localhost:3001/api/v1/user/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "password123"
  }'
```

**3. Get Balance**
```bash
curl -X GET http://localhost:3001/api/v1/account \
  -H "Authorization: Bearer <your_token>"
```

**4. Transfer Money**
```bash
curl -X POST http://localhost:3001/api/v1/account/transfer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "amount": 100,
    "to": "<recipient_user_id>"
  }'
```

---

## Key Implementation Details

### Atomic Transactions
The transfer endpoint uses **MongoDB sessions** to ensure atomicity:
```javascript
const session = await mongoose.startSession();
session.startTransaction();
try {
  // Deduct from sender
  await accountModel.updateOne({userId: senderId}, {$inc: {balance: -amount}}).session(session);
  // Add to receiver
  await accountModel.updateOne({userId: receiverId}, {$inc: {balance: amount}}).session(session);
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
} finally {
  session.endSession();
}
```

### JWT Middleware
Protected routes extract userId from JWT:
```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  req.userId = decoded.userId;
  next();
};
```

---

## Environment Variables

```env
PORT=3001                           # Server port
MONGO_URI=mongodb+srv://...         # MongoDB connection string
JWT_SECRET=your_secret_key          # JWT signing secret
```

---

## Contributing

Feel free to submit issues and pull requests!

---

## License

This project is open source and available under the MIT License.

---

## Author

Built by Tirth

---

## Future Enhancements

- Transaction history
- Email notifications
- Two-factor authentication
- Password reset functionality
- Profile picture upload
- Account statements/reports
- Admin dashboard
- Rate limiting
- Request logging

---

**Happy Coding!**
