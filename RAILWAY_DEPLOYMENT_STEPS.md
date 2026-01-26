# 🚂 Railway Deployment Guide - Complete Steps

This guide will help you deploy your portfolio application with form submission to Railway.

## ✅ Prerequisites Checklist

Before deploying, ensure:
- [ ] Your code is committed to GitHub
- [ ] You have a Railway account (sign up at https://railway.app)
- [ ] Your local code works (test form submission locally first)

## 📋 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Fixed database connection for Railway deployment"
git push origin main
```

### Step 2: Create Railway Project

1. Go to [Railway.app](https://railway.app) and log in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `Portfolio` repository
5. Railway will create a new project

### Step 3: Add MySQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will automatically provision a MySQL database
4. Wait for the database to be ready (status shows "Active")

### Step 4: Configure Environment Variables

Railway automatically creates database variables, but you need to add one more:

1. Click on your **GitHub service** (not the MySQL service)
2. Go to the **"Variables"** tab
3. Click **"+ New Variable"**
4. Add the following:
   - **Variable Name**: `NODE_ENV`
   - **Value**: `production`
5. Click **"Add"**

**Important**: Railway should automatically provide these variables from MySQL:
- `MYSQL_URL` (this is the most important one)
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `MYSQLDATABASE`

### Step 5: Configure Build Settings

1. Still in your GitHub service, go to **"Settings"** tab
2. Scroll to **"Build"** section
3. Set the following:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
4. Click **"Save"**

### Step 6: Deploy

1. Go to the **"Deployments"** tab
2. Click **"Deploy"** or wait for automatic deployment
3. Watch the build logs for any errors

### Step 7: Get Your Public URL

1. Go to **"Settings"** tab in your GitHub service
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Railway will give you a URL like: `https://your-app-name.up.railway.app`
5. Copy this URL

### Step 8: Update CORS Settings

1. Open `server/server-prod.js` locally
2. Find line 10 where it says:
   ```javascript
   origin: ["https://your-domain.up.railway.app", "http://localhost:3000"],
   ```
3. Replace `your-domain.up.railway.app` with your actual Railway URL
4. Save, commit, and push:
   ```bash
   git add .
   git commit -m "Updated CORS with Railway URL"
   git push origin main
   ```
5. Railway will automatically redeploy

### Step 9: Test Your Application

1. Visit your Railway URL
2. Navigate to the contact form
3. Fill out and submit the form
4. Check the Railway logs:
   - Go to your Railway project
   - Click on your GitHub service
   - Go to **"Deployments"** tab
   - Click on the latest deployment
   - View the logs to see if form submission worked

## 🔍 Troubleshooting

### Error: ECONNREFUSED

**Cause**: Application can't connect to database

**Solutions**:
1. Check that MySQL service is running (green status in Railway)
2. Verify `MYSQL_URL` variable exists in your app's Variables tab
3. Make sure both services (app and MySQL) are in the same project
4. Check Railway logs for connection errors

### Error: Table doesn't exist

**Cause**: Database table not created

**Solution**: The app should auto-create the table. Check logs for:
```
✅ Database connection successful!
✅ Database table ready
```

If you don't see this, the connection failed.

### Error: 502 Bad Gateway

**Cause**: Application crashed or not starting

**Solutions**:
1. Check deployment logs for errors
2. Verify `PORT` environment variable is set (Railway sets this automatically)
3. Make sure start command is correct: `cd server && npm start`

### Form submission fails with CORS error

**Cause**: CORS origin not configured correctly

**Solution**: Update the CORS origin in `server-prod.js` with your actual Railway URL

## 📊 Monitoring Your Application

### View Logs
1. Go to your Railway project
2. Click on your GitHub service
3. Click **"Deployments"** → Select latest deployment
4. View real-time logs

### Check Database
1. Click on your MySQL service
2. Go to **"Data"** tab
3. You can query your database here

### Health Check
Visit: `https://your-app-name.up.railway.app/api/health`

Should return:
```json
{
  "status": "ok",
  "environment": "production",
  "timestamp": "2026-01-26T..."
}
```

## 🔄 Updating Your Application

Every time you make changes:

```bash
git add .
git commit -m "Your change description"
git push origin main
```

Railway will automatically:
1. Detect the push
2. Build your application
3. Deploy the new version
4. Zero-downtime deployment

## 🎯 Quick Checklist for Successful Deployment

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] MySQL database added
- [ ] `NODE_ENV=production` variable set
- [ ] Build and start commands configured
- [ ] Domain generated
- [ ] CORS updated with Railway URL
- [ ] Application tested and working
- [ ] Form submission tested
- [ ] Database receiving data

## 📞 Need Help?

If you encounter issues:
1. Check Railway deployment logs
2. Verify all environment variables are set
3. Ensure MySQL service is active
4. Test the `/api/health` endpoint
5. Check browser console for frontend errors

---

**Your application should now be live at**: `https://your-app-name.up.railway.app`

Good luck! 🚀
