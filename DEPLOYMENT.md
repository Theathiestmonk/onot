# ONOT Deployment Guide

## Quick Start: Deploy to Vercel (Frontend) + Railway/Render (Backend)

### Prerequisites
- GitHub repository: https://github.com/Theathiestmonk/onot
- Supabase project with database set up
- Vercel account
- Railway or Render account

---

## Step 1: Deploy Backend (Choose One)

### Option A: Railway (Recommended)

1. **Sign up/Login**: [railway.app](https://railway.app)
2. **New Project** → Deploy from GitHub
3. **Select Repository**: `Theathiestmonk/onot`
4. **Settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables**:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=5001
   ```
6. **Deploy** → Copy the generated URL (e.g., `https://onot-backend.railway.app`)

### Option B: Render

1. **Sign up/Login**: [render.com](https://render.com)
2. **New** → Web Service
3. **Connect GitHub** → Select `Theathiestmonk/onot`
4. **Settings**:
   - Name: `onot-backend`
   - Root Directory: `backend`
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Environment Variables**: Same as Railway
6. **Deploy** → Copy the generated URL

---

## Step 2: Update Backend CORS

Update `backend/src/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'  // Add your Vercel URL after deployment
  ],
  credentials: true
}));
```

Commit and push changes:
```bash
git add backend/src/server.js
git commit -m "Update CORS for production"
git push
```

---

## Step 3: Deploy Frontend to Vercel

1. **Sign up/Login**: [vercel.com](https://vercel.com)
2. **Add New Project** → Import Git Repository
3. **Select Repository**: `Theathiestmonk/onot`
4. **Configure Project**:
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)
5. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
   (Use your Railway/Render backend URL from Step 1)
6. **Deploy**

---

## Step 4: Update CORS with Vercel URL

After Vercel deployment, you'll get a URL like `https://onot.vercel.app`

1. Update `backend/src/server.js` CORS to include this URL
2. Redeploy backend (Railway/Render will auto-deploy on git push)

---

## Environment Variables Summary

### Frontend (Vercel)
- `VITE_API_URL` = Your backend API URL (e.g., `https://onot-backend.railway.app/api`)

### Backend (Railway/Render)
- `SUPABASE_URL` = Your Supabase project URL
- `SUPABASE_ANON_KEY` = Your Supabase anon key
- `PORT` = Usually auto-set (5001 for local, auto for production)

---

## Testing After Deployment

1. **Frontend**: Visit your Vercel URL
2. **Test Features**:
   - ✅ Home page loads
   - ✅ Cities load from API
   - ✅ Attractions display
   - ✅ Cart functionality
   - ✅ Booking flow

---

## Troubleshooting

### CORS Errors
- Ensure backend CORS includes your Vercel domain
- Check environment variables are set correctly

### API Not Found
- Verify `VITE_API_URL` includes `/api` at the end
- Check backend is running and accessible

### Build Failures
- Check Node version (Vercel auto-detects, but can set in settings)
- Ensure all dependencies are in `package.json`

---

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Update Backend CORS
Add custom domain to CORS origins in `backend/src/server.js`

---

## Continuous Deployment

Both platforms auto-deploy on git push to `main` branch:
- **Vercel**: Auto-deploys on push
- **Railway/Render**: Auto-deploys on push (if configured)

Just push to GitHub and deployments happen automatically!

---

## Cost Estimate

- **Vercel**: Free tier (generous limits)
- **Railway**: Free tier available, then $5/month
- **Render**: Free tier available, then $7/month
- **Supabase**: Free tier (generous limits)

---

## Support Links

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

