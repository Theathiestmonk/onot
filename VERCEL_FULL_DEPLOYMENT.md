# Full Vercel Deployment Guide - Frontend + Backend

This guide will help you deploy both the frontend and backend on Vercel using serverless functions.

## Project Structure

```
onot/
├── api/                    # Vercel serverless functions
│   ├── cities.js
│   ├── attractions.js
│   ├── attractions/
│   │   └── [id].js
│   ├── bookings.js
│   ├── bookings/
│   │   └── [id].js
│   └── health.js
├── frontend/              # React frontend
├── backend/               # Original Express backend (for reference)
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json
```

## Prerequisites

- GitHub repository: https://github.com/Theathiestmonk/onot
- Vercel account
- Supabase project with database set up

## Step 1: Environment Variables Setup

You'll need to add these environment variables in Vercel:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following:

### For API Functions:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key

### For Frontend:
- `VITE_API_URL` - Will be automatically set to `/api` (relative URL works on Vercel)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Sign up/Login**: [vercel.com](https://vercel.com)
2. **Add New Project** → Import Git Repository
3. **Select Repository**: `Theathiestmonk/onot`
4. **Configure Project**:
   - Framework Preset: **Vite** (or Other)
   - Root Directory: Leave empty (root)
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`
5. **Environment Variables**: Add Supabase credentials
6. **Deploy**

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? onot
# - Directory? ./
# - Override settings? No
```

## Step 3: Update Frontend API URL

The frontend should use relative URLs for API calls. Update `frontend/src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

This will work automatically:
- **Development**: Uses `http://localhost:5001/api` (from `.env`)
- **Production**: Uses `/api` (relative, works with Vercel)

## Step 4: Verify Deployment

After deployment, test:

1. **Frontend**: Visit `https://your-app.vercel.app`
2. **API Health**: Visit `https://your-app.vercel.app/api/health`
3. **Cities API**: Visit `https://your-app.vercel.app/api/cities`
4. **Test Full Flow**: Browse cities, view attractions, add to cart

## API Endpoints

All API endpoints are available at:
- `GET /api/cities` - List all cities
- `GET /api/attractions` - Get attractions (with query params)
- `GET /api/attractions/[id]` - Get single attraction
- `POST /api/bookings` - Create booking
- `GET /api/bookings/[id]` - Get booking details
- `GET /api/health` - Health check

## How It Works

1. **Frontend**: Served as static files from `frontend/dist`
2. **API Routes**: Each file in `api/` becomes a serverless function
3. **Routing**: Vercel's `vercel.json` handles routing:
   - `/api/*` → Serverless functions
   - `/*` → Frontend static files

## Troubleshooting

### API Functions Not Working

1. Check environment variables are set in Vercel
2. Verify Supabase credentials are correct
3. Check function logs in Vercel dashboard

### CORS Issues

- CORS headers are set in each API function
- Should work automatically
- If issues persist, check function logs

### Build Failures

1. Check Node version (Vercel uses Node 20.x by default)
2. Verify all dependencies are in `package.json`
3. Check build logs in Vercel dashboard

### Frontend Can't Connect to API

1. Ensure `VITE_API_URL` is set to `/api` (relative) or leave empty
2. Check browser console for errors
3. Verify API functions are deployed (check Vercel dashboard)

## Environment Variables Reference

### Required for API Functions:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### Optional for Frontend:
```
VITE_API_URL=/api
```

## Cost

- **Vercel Free Tier**: 
  - 100GB bandwidth
  - Unlimited serverless function invocations
  - Perfect for this project!

## Continuous Deployment

Vercel automatically deploys on every push to `main` branch:
1. Push to GitHub
2. Vercel detects changes
3. Builds and deploys automatically
4. You get a deployment URL

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update CORS if needed (usually not required)

## Monitoring

- **Logs**: View in Vercel dashboard → Deployments → Function Logs
- **Analytics**: Available in Vercel dashboard
- **Performance**: Monitor in Vercel dashboard

## Rollback

- Go to Deployments in Vercel dashboard
- Find previous deployment
- Click "..." → "Promote to Production"

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Supabase Documentation](https://supabase.com/docs)

