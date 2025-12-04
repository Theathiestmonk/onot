# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: `travel-app` (or any name you prefer)
   - Database Password: Choose a strong password (save it!)
   - Region: Choose the closest region
4. Wait for the project to be created (takes 1-2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** (gear icon)
2. Click on **API** in the left sidebar
3. You'll see:
   - **Project URL** - Copy this (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** - Copy this (long string starting with `eyJ...`)

## Step 3: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `backend/supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

## Step 4: Configure Environment Variables

1. In the `backend` folder, create a `.env` file (if it doesn't exist)
2. Add the following:

```env
PORT=5000
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
NODE_ENV=development
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

## Step 5: Seed the Database

Run the seed script to populate your database with sample data:

```bash
cd backend
npm run seed
```

You should see:
```
Starting database seed...
Cleared existing data
Inserted 5 cities
Inserted 15 attractions
Database seeded successfully!
```

## Step 6: Start the Application

1. Start the backend:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure your `.env` file exists in the `backend` folder
- Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly

### "relation does not exist" error
- Make sure you ran the SQL schema in Step 3
- Check that all tables were created in the Supabase dashboard (Table Editor)

### Connection errors
- Verify your Supabase project is active
- Check that your API keys are correct
- Make sure your internet connection is working

