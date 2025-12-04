# Vercel Deployment Plan for ONOT

## Project Overview
- **Frontend**: Vite + React (runs on Vercel)
- **Backend**: Node.js/Express API (needs serverless functions)
- **Database**: Supabase (already hosted)

## Deployment Strategy

### Option 1: Full Vercel Deployment (Recommended)
Deploy both frontend and backend on Vercel using:
- Frontend: Vercel's static hosting
- Backend: Vercel Serverless Functions

### Option 2: Hybrid Deployment
- Frontend: Vercel
- Backend: Separate hosting (Railway, Render, etc.)

---

## Option 1: Full Vercel Deployment

### Step 1: Prepare Backend for Serverless Functions

1. **Create API Routes Structure**
   ```
   api/
   ├── cities/
   │   └── index.js
   ├── attractions/
   │   └── index.js
   ├── attractions/
   │   └── [id].js
   ├── bookings/
   │   └── index.js
   └── bookings/
       └── [id].js
   ```

2. **Convert Express Routes to Serverless Functions**
   - Each route becomes a separate serverless function
   - Use Vercel's API routing format

### Step 2: Update Frontend Configuration

1. **Update API URL**
   - Production: Use relative URLs or Vercel's API routes
   - Development: Keep `localhost:5001`

2. **Environment Variables**
   - Add to Vercel dashboard:
     - `VITE_API_URL` (for frontend)
     - `SUPABASE_URL` (for backend functions)
     - `SUPABASE_ANON_KEY` (for backend functions)

### Step 3: Create Vercel Configuration

**vercel.json**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist"
      }
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase_url",
    "SUPABASE_ANON_KEY": "@supabase_anon_key"
  }
}
```

### Step 4: Update Package.json Scripts

**Root package.json**:
```json
{
  "scripts": {
    "build": "cd frontend && npm run build",
    "dev": "cd frontend && npm run dev"
  }
}
```

---

## Option 2: Hybrid Deployment (Simpler)

### Frontend on Vercel

1. **Deploy Frontend Only**
   - Point Vercel to `frontend/` directory
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Environment Variables**
   - `VITE_API_URL`: Your backend API URL (e.g., Railway/Render URL)

### Backend on Railway/Render

1. **Deploy Backend Separately**
   - Railway: Connect GitHub repo, select `backend/` folder
   - Render: Create Web Service, point to `backend/` folder
   - Environment variables:
     - `SUPABASE_URL`
     - `SUPABASE_ANON_KEY`
     - `PORT` (auto-assigned)

2. **Update Frontend API URL**
   - Use the deployed backend URL in `VITE_API_URL`

---

## Recommended Approach: Option 2 (Hybrid)

**Why?**
- Simpler setup
- Backend remains as Express app (no refactoring)
- Easier to debug
- Can scale independently

### Implementation Steps

#### 1. Deploy Backend (Railway/Render)

**Railway:**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository: `Theathiestmonk/onot`
4. Root Directory: `backend`
5. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
6. Deploy

**Render:**
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Deploy

#### 2. Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Import Project → GitHub
3. Select repository: `Theathiestmonk/onot`
4. Root Directory: `frontend`
5. Framework Preset: Vite
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Environment Variables:
   - `VITE_API_URL`: `https://your-backend-url.railway.app/api` (or Render URL)

#### 3. Update CORS Settings

In `backend/src/server.js`, ensure CORS allows your Vercel domain:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'
  ]
}));
```

---

## Environment Variables Checklist

### Frontend (Vercel)
- `VITE_API_URL` - Backend API URL

### Backend (Railway/Render)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `PORT` - Usually auto-set by platform

---

## Post-Deployment Checklist

- [ ] Test frontend loads correctly
- [ ] Test API endpoints from frontend
- [ ] Verify CORS is working
- [ ] Test city fetching
- [ ] Test attractions listing
- [ ] Test cart functionality
- [ ] Test booking flow
- [ ] Update any hardcoded URLs
- [ ] Test on mobile devices

---

## Custom Domain (Optional)

1. **Vercel**: Add custom domain in project settings
2. **Backend**: Update CORS to include custom domain
3. **Update**: `VITE_API_URL` if needed

---

## Monitoring & Logs

- **Vercel**: View logs in dashboard → Deployments
- **Railway/Render**: View logs in service dashboard
- **Supabase**: Monitor in Supabase dashboard

---

## Rollback Plan

- **Vercel**: Use deployment history to rollback
- **Backend**: Use platform's rollback feature
- Keep previous deployments for quick rollback

---

## Next Steps

1. Choose deployment option (recommended: Option 2)
2. Deploy backend first (Railway/Render)
3. Get backend URL
4. Deploy frontend (Vercel) with backend URL
5. Test thoroughly
6. Update documentation

