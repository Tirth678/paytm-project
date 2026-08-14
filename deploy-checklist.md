# Deployment Checklist

## Before Deployment

- [ ] All code committed to Git
- [ ] MongoDB Atlas configured (IP: 0.0.0.0/0)
- [ ] .env files NOT committed (check .gitignore)
- [ ] Backend tested locally
- [ ] Frontend tested locally

## Deploy Backend First

1. [ ] Create new Vercel project for backend
2. [ ] Set Root Directory: `backend`
3. [ ] Add Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT=3001`
   - `NODE_ENV=production`
4. [ ] Deploy and copy URL

## Deploy Frontend Second

1. [ ] Update `.env.production` with backend URL
2. [ ] Create new Vercel project for frontend
3. [ ] Set Root Directory: `frontend`
4. [ ] Set Framework: Vite
5. [ ] Add Environment Variable:
   - `VITE_API_URL=<backend-url>`
6. [ ] Deploy

## Test

- [ ] Visit frontend URL
- [ ] Sign up new user
- [ ] Sign in
- [ ] Check balance
- [ ] Search users
- [ ] Transfer money

## Done! 🎉
