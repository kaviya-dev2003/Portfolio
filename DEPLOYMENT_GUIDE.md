# Deployment Guide: Portfolio Website

This guide explains how to get your website live on the internet.

## 🚀 Part 1: Deploying the Frontend (GitHub Pages)

GitHub Pages is used to host your **React Frontend** (the `client` folder).

### 1. The Automatic Way (GitHub Actions)
I have configured a "GitHub Action" that will automatically update your website every time you "Push" code to GitHub.

- **How it works**: Whenever you commit and push changes to the `main` branch, GitHub will run the steps in `.github/workflows/deploy.yml` to build your React app and publish it.
- **Your URL**: `https://kaviya-dev2003.github.io/Portfolio/`

### 2. The Manual Way
If you want to deploy manually from your terminal:
1. Open terminal in the root folder.
2. Run: `cd client`
3. Run: `npm run deploy`
   - *This command builds the project and pushes the `build` folder to a special branch called `gh-pages`.*

---

## ⚙️ Part 2: The Backend Challenge

> [!WARNING]
> **GitHub Pages CANNOT host your Backend (Express + MySQL).**
> GitHub Pages is for "Static sites" only.

For your **Contact Form** to work online:
1. You need to host the `server` folder on a cloud provider like **Render**, **Railway**, or **Railway**.
2. You need an online database (like **Remote MySQL** or **Aiven**) because your current MySQL is local (XAMPP).

### Temporary Solution:
If you just want to show your design and resume, GitHub Pages is perfect! The contact form will only work when you are running the backend locally on your computer.

---

## 📝 Summary of Steps to Update Your Site
1. Make your changes in the code.
2. Open terminal and run:
   ```bash
   git add .
   git commit -m "Updated my portfolio"
   git push origin main
   ```
3. Wait 2-3 minutes, and your site at `https://kaviya-dev2003.github.io/Portfolio/` will update automatically!
