# Travel Attractions Booking Webapp

A full-stack travel webapp built with Vite + React (frontend) and Node.js/Express (backend) that displays city attractions and enables ticket booking. Uses Supabase as the database backend.

## Project Structure

```
unot/
├── frontend/          # Vite + React app
├── backend/           # Node.js/Express API
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Supabase account and project

### Supabase Setup

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API to get your credentials:
   - Project URL (SUPABASE_URL)
   - Anon/Public Key (SUPABASE_ANON_KEY)
4. Go to SQL Editor and run the schema from `backend/supabase-schema.sql`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your Supabase credentials:
   ```
   PORT=5000
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=development
   ```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the frontend directory
   - Add your API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

- Browse attractions by city
- Filter attractions by category, price, and rating
- View detailed attraction information
- Book tickets for attractions
- View booking confirmations

## API Endpoints

- `GET /api/cities` - List all cities
- `GET /api/attractions` - Get attractions (with filters)
- `GET /api/attractions/:id` - Get single attraction details
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking details

## Database Schema

The app uses Supabase (PostgreSQL) with the following tables:
- `cities` - City information
- `attractions` - Attraction details
- `bookings` - Booking records

See `backend/supabase-schema.sql` for the complete schema.
