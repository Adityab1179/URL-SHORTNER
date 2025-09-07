# URL Shortener Backend

This is the backend service for a URL shortener application. It provides RESTful APIs to create, retrieve, and redirect shortened URLs, as well as user authentication.

## Features

- User registration and login with JWT authentication (token stored in HTTP-only cookies)
- Shorten long URLs to unique short codes
- Redirect short URLs to their original destinations
- Track usage statistics (if implemented)
- Simple REST API

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your chosen database)
- Mongoose (if using MongoDB)
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running (if using MongoDB)

### Installation

```bash
cd Backend
npm install
```

### Configuration

- Create a `.env` file in the `Backend` directory with your environment variables. Example:
  ```
  MONGODB_URI=mongodb://localhost:27017/urlshortener
  JWT_SECRET=your_jwt_secret
  BASE_URL=http://localhost:3000
  PORT=3000
  ```

### Running the Server

```bash
npm start
```
or
```bash
node index.js
```

### API Endpoints

#### Authentication

- `POST /api/register` - Register a new user
- `POST /api/login` - Login and receive a JWT token (set as HTTP-only cookie)

#### URL Shortening

- `POST /api/shorten` - Shorten a long URL (authentication may be required)
- `GET /:shortCode` - Redirect to the original URL


