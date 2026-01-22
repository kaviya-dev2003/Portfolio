# Deployment Guide: Railway.com (Full-Stack)

This guide explains how to deploy your entire portfolio (Frontend + Backend + Database) to Railway.com.

## 🚀 Part 1: Prepare for Deployment

I have already optimized your code to work as a "Monorepo":
- The backend serves the frontend automatically in production.
- Database settings are configured to use Railway's default variables.
- Build scripts are unified in the root folder.

## ⚙️ Part 2: Railway.com Setup

### 1. Create a Railway Project
1. Log in to [Railway.com](https://railway.com/).
2. Click **"New Project"** -> **"Deploy from GitHub repo"**.
3. Select your `Portfolio` repository.

### 2. Add a Database
1. Inside your Railway project, click **"Add Service"**.
2. Select **"Database"** -> **"MySQL"**.
3. Railway will automatically set up the variables (like `MYSQLHOST`) and link them to your app.

### 3. Configure App Settings
1. Click on your connected GitHub service (the app).
2. Go to **Variables** tab.
3. Click **"New Variable"** and add:
   - `NODE_ENV` = `production`
4. (Optional) Check that Railway has successfully linked the `MYSQLHOST`, `MYSQLUSER`, etc., variables from the MySQL service.

## 📝 Summary of Steps to Update Your Site

Every time you want to update your live site:
1. Save your changes locally.
2. Open terminal and run:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```
3. Railway will automatically detect the push, run `npm run build`, and deploy your new version.

---

> [!NOTE]
> **GitHub Pages vs Railway**: While you *can* still use GitHub Pages for just the design (frontend), Railway is better because it hosts your **Contact Form** and **Database** as well.
