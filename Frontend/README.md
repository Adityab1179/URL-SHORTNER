# URL Shortener Frontend

This is the frontend for the URL Shortener application, built with React and Vite.

## Features

- Simple and clean UI for shortening URLs
- Integration with backend API for URL shortening and redirection
- Error handling for API requests
- Modular component structure

## Project Structure

```
src/
  App.jsx                # Main React component
  main.jsx               # Entry point
  index.css              # Global styles
  api/                   # API-related logic (future use)
  components/            # Reusable UI components
    Home.jsx
    Url_Shortner_form.jsx
  Pages/                 # Page-level components (future use)
  routing/               # Routing logic (future use)
  utils/
    axiosInstance.jsx    # Axios instance with error handling
public/
  vite.svg               # Static assets
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Configuration

- The Axios instance (`src/utils/axiosInstance.jsx`) is pre-configured to connect to the backend at `http://localhost:3000/api`. Update this URL if your backend runs elsewhere.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build