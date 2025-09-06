# URL Shortener Backend

This is the backend service for a URL shortener application. It provides RESTful APIs to create, retrieve, and redirect shortened URLs.

## Features

- Shorten long URLs to unique short codes
- Redirect short URLs to their original destinations
- Track usage statistics (if implemented)
- Simple REST API

## Technologies Used

- Node.js
- Express.js
- MongoDB (or your chosen database)
- Mongoose (if using MongoDB)

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

- Create a `.env` file in the `Backend` directory with your environment variables (e.g., database URI, port).

### Running the Server

```bash
npm start
```
or
```bash
node index.js
```

### API Endpoints

- `POST /api/shorten` - Shorten a long URL
- `GET /:shortCode` - Redirect to the original URL


