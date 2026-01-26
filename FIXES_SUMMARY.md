# 🎯 Railway Deployment - What I Fixed

## 🐛 The Problem

Your application was getting `ECONNREFUSED` errors because:

1. **Invalid MySQL configuration**: Using `uri` option which doesn't exist in mysql2
2. **Missing environment variable loading**: `.env` file wasn't being loaded
3. **Incorrect connection format**: Railway's `MYSQL_URL` wasn't being parsed correctly

## ✅ What I Fixed

### 1. Fixed Database Connection (`server-prod.js`)

**Before:**
```javascript
const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,  // ❌ This option doesn't exist!
  ssl: { rejectUnauthorized: false },
  // ...
});
```

**After:**
```javascript
// Parse the MYSQL_URL properly
function parseMySQLUrl(url) {
  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  return {
    host: match[3],
    user: match[1],
    password: match[2],
    port: parseInt(match[4]),
    database: match[5]
  };
}

const dbConfig = parseMySQLUrl(process.env.MYSQL_URL);

const pool = mysql.createPool({
  host: dbConfig.host,      // ✅ Correct format
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  // ...
});
```

### 2. Added Environment Variable Loading

```javascript
require("dotenv").config();  // ✅ Now loads .env file
```

### 3. Enhanced Error Logging

Added detailed logging to help debug issues:
- Connection test messages
- Database host and name logging
- Better error messages with full error details

## 📁 New Files Created

1. **RAILWAY_DEPLOYMENT_STEPS.md** - Complete step-by-step deployment guide
2. **server/test-railway-connection.js** - Test script to verify database connection

## 🚀 Next Steps - Deploy to Railway

Follow these steps IN ORDER:

### Step 1: Verify Your Railway Setup

1. Go to [Railway.app](https://railway.app)
2. Make sure you have:
   - ✅ A project created
   - ✅ MySQL database service added
   - ✅ Your GitHub repo connected

### Step 2: Check Environment Variables

In your Railway project (GitHub service):
1. Click on your app service
2. Go to **Variables** tab
3. Verify these exist:
   - `MYSQL_URL` (should be auto-created by Railway from MySQL service)
   - `NODE_ENV` = `production` (add this if missing)

### Step 3: Configure Build Settings

1. Go to **Settings** tab
2. Set:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`

### Step 4: Deploy

Railway should auto-deploy since you just pushed to GitHub. If not:
1. Go to **Deployments** tab
2. Click **Deploy**

### Step 5: Monitor Deployment

Watch the logs for these messages:
```
🚀 Server running on port 8080
🌍 Environment: production
📊 Database host: mysql.railway.internal
📊 Database name: railway
🔌 Testing database connection...
✅ Database connection successful!
✅ Database table ready
✅ Application ready to accept requests
```

### Step 6: Get Your URL

1. Go to **Settings** → **Networking**
2. Click **Generate Domain**
3. You'll get a URL like: `https://portfolio-production-xxxx.up.railway.app`

### Step 7: Update CORS (Important!)

Once you have your Railway URL:

1. Edit `server/server-prod.js` line 10
2. Replace `your-domain.up.railway.app` with your actual URL
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update CORS with Railway URL"
   git push origin main
   ```

### Step 8: Test!

1. Visit your Railway URL
2. Go to contact form
3. Submit a test message
4. Check Railway logs to confirm it worked

## 🔍 Troubleshooting

### If deployment fails:

1. **Check Railway logs** - Look for error messages
2. **Verify MYSQL_URL exists** - In Variables tab
3. **Ensure MySQL is running** - Green status in Railway
4. **Check build logs** - Make sure `npm install` succeeded

### If form submission fails:

1. **Check browser console** - Look for CORS errors
2. **Verify CORS URL** - Must match your Railway domain
3. **Check Railway logs** - Look for database errors
4. **Test health endpoint** - Visit `/api/health`

## 📊 How to Monitor

### View Logs
Railway → Your Service → Deployments → Latest → Logs

### Check Database
Railway → MySQL Service → Data tab

### Health Check
Visit: `https://your-url.up.railway.app/api/health`

## ✨ Summary

✅ Fixed database connection parsing
✅ Added environment variable loading  
✅ Enhanced error logging
✅ Created deployment guide
✅ Created connection test script
✅ Pushed changes to GitHub

**Your code is now ready for Railway deployment!** 🚀

Follow the steps above and your application should work perfectly.
