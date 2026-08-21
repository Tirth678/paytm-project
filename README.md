# PayTM Clone - Digital Wallet Application

A full-stack digital wallet application built with **Node.js**, **Express**, **MongoDB**, and **React**. Users can sign up, manage their accounts, search for other users, and transfer money securely with atomic transactions.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Frontend Routes](#frontend-routes)
- [Database Schema](#database-schema)
- [Security Features](#security-features)
- [Testing](#testing)

---

## Features

### User Management
- User registration with email validation
- Secure login with JWT authentication
- Update user profile (name, password)
- Search users by name (partial matching, real-time)

### Account & Transactions
- Auto-create account with random balance (Rs.1 - Rs.10,000) on signup
- View account balance in real-time
- Transfer money to other users
- Atomic transactions with MongoDB sessions
- Insufficient balance validation
- Invalid recipient validation

### Security
- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes with auth middleware
- CORS enabled for cross-origin requests
- Input validation with Zod
- Secure token storage in localStorage

---

## Tech Stack

### Backend
- **Runtime:** Node.js v16+ (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Security:** CORS

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
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
    ├── src/
    │   ├── components/
    │   │   ├── AppBar.jsx           # Navigation bar
    │   │   ├── Balance.jsx          # Balance display
    │   │   ├── BottomWarning.jsx    # Footer links
    │   │   ├── Btn.jsx              # Button component
    │   │   ├── Heading.jsx          # Page heading
    │   │   ├── Input.jsx            # Input field
    │   │   ├── SubHeading.jsx       # Subheading
    │   │   └── Users.jsx            # User search & list
    │   ├── pages/
    │   │   ├── Dashboard.jsx        # User dashboard
    │   │   ├── Home.jsx             # Landing page
    │   │   ├── SendMoney.jsx        # Money transfer page
    │   │   ├── Signin.jsx           # Login page
    │   │   └── Signup.jsx           # Registration page
    │   ├── App.jsx                  # Main app component
    │   ├── main.jsx                 # App entry point
    │   └── index.css                # Global styles
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   
   Server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:5173`

---

## API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### 1. Sign Up
**POST** `/user/signup`

**Headers:** `Content-Type: application/json`

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
- Automatically creates wallet account with random balance (Rs.1-Rs.10,000)
- Returns JWT token
- Names must be at least 6 characters

---

#### 2. Sign In
**POST** `/user/signin`

**Headers:** `Content-Type: application/json`

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
- `Content-Type: application/json`
- `Authorization: Bearer <your_token>`

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

**Headers:** `Authorization: Bearer <your_token>`

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
- Empty filter returns all users

---

### Account Operations

#### 5. Get Account Balance
**GET** `/account`

**Headers:** `Authorization: Bearer <your_token>`

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
- `Content-Type: application/json`
- `Authorization: Bearer <your_token>`

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
- Rolls back on any failure

---

## Frontend Routes

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | Home | Landing page | No |
| `/signup` | Signup | User registration | No |
| `/signin` | Signin | User login | No |
| `/dashboard` | Dashboard | User dashboard with balance & user search | Yes |
| `/send?id=<userId>&name=<name>` | SendMoney | Money transfer page | Yes |

**Protected Routes:**
- Automatically redirect to `/signin` if no valid token
- Token is stored in localStorage
- Token includes userId payload

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

**Relationship:**
- One-to-One: Each user has exactly one account
- Account is created automatically during user signup

---

## Security Features

### Password Security
- Passwords hashed using **bcrypt** with 10 salt rounds
- Never stored or transmitted in plain text
- Passwords automatically hashed on update

### Authentication
- JWT tokens for stateless authentication
- Token includes userId payload
- Protected routes verify token via middleware
- Token stored in localStorage on client

### Input Validation
- **Zod** schema validation for all inputs
- Email format validation
- Password strength requirements
- Field length restrictions (firstName, lastName min 6 chars)

### Transaction Safety
- MongoDB sessions for atomic operations
- Automatic rollback on failure
- Balance validation before transfer
- Recipient validation before transfer

### CORS
- Configured to allow frontend origin
- Credentials support enabled
- Proper headers for cross-origin requests

---

## Testing

### Manual Testing with cURL

**1. Create User**
```bash
curl -X POST http://localhost:3000/api/v1/user/signup \
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
curl -X POST http://localhost:3000/api/v1/user/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "password123"
  }'
```

**3. Get Balance**
```bash
curl -X GET http://localhost:3000/api/v1/account \
  -H "Authorization: Bearer <your_token>"
```

**4. Search Users**
```bash
curl -X GET "http://localhost:3000/api/v1/user/bulk?filter=test" \
  -H "Authorization: Bearer <your_token>"
```

**5. Transfer Money**
```bash
curl -X POST http://localhost:3000/api/v1/account/transfer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "amount": 100,
    "to": "<recipient_user_id>"
  }'
```

### Testing Workflow

1. **Sign up** two users from the frontend
2. **Sign in** with the first user
3. **View balance** on the dashboard
4. **Search** for the second user
5. Click **"Send Money"** on the second user
6. **Enter amount** and click "Initiate Transfer"
7. **Check balance** - should be reduced
8. **Sign out** and sign in as the second user
9. **Check balance** - should be increased

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

### Real-time Search
User search updates as you type using useEffect:
```javascript
useEffect(() => {
  axios.get(`/api/v1/user/bulk?filter=${search}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => setUsers(response.data.users))
}, [search])
```

---

## Environment Variables

### Backend (.env)
```env
PORT=3000                           # Server port
MONGO_URI=mongodb+srv://...         # MongoDB connection string
JWT_SECRET=your_secret_key          # JWT signing secret (keep this secure!)
```

**Generate a secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Common Issues & Troubleshooting

### CORS Errors
- Make sure backend server is running on port 3001
- Frontend should be on port 5173 (Vite default)
- Check if CORS is enabled in backend index.js

### "Invalid account" Error
- Recipient user must have an account (created during signup)
- Make sure you're sending to a valid user ID
- Both users must be registered through the signup endpoint

### Balance Not Showing
- Check if JWT token is in localStorage
- Verify Authorization header is being sent
- Check browser console for errors

### Transfer Fails
- Ensure sufficient balance
- Verify recipient user ID is correct
- Check if amount is a positive number

---

## Future Enhancements

- Transaction history with timestamps
- Email notifications for transfers
- Two-factor authentication (2FA)
- Password reset functionality
- Profile picture upload
- Account statements/reports (PDF export)
- Admin dashboard for monitoring
- Rate limiting for API endpoints
- Request logging with Morgan
- User activity tracking
- Multi-currency support
- Scheduled/recurring payments
- QR code-based transfers
- Mobile app with React Native

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

## Acknowledgments

- MongoDB for the robust NoSQL database
- Express.js for the powerful backend framework
- React for the interactive UI
- Tailwind CSS for beautiful styling
- JWT for secure authentication
- Bcrypt for password security

---

**Happy Coding!**
