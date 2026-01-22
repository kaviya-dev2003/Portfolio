# Portfolio Project: Complete Tech Stack & Command Guide

This document serves as a comprehensive reference for the tools, packages, and terminal commands used to build and restructure this portfolio project.

## 🏗️ Project Architecture
The project uses a **Monorepo** structure, separating the concerns of the frontend and backend while managing them from a single root folder.

```text
portfolio/
├── client/          # React Frontend (User Interface)
├── server/          # Express Backend (API & Database)
└── package.json     # Global scripts to run both at once
```

---

## 🛠️ Tools & Environment
- **Node.js**: The JavaScript runtime environment.
- **npm**: Node Package Manager, used to install and manage libraries.
- **XAMPP**: Software used to run a local **MySQL** database and **phpMyAdmin**.
- **VS Code**: The primary code editor.
- **Git**: Used for version control and deploying to GitHub Pages.

---

## 📦 Key Packages & Libraries

### 💻 Frontend (Inside `/client`)
| Package | Purpose |
| :--- | :--- |
| **react** | The core library for building the user interface. |
| **react-router-dom** | Handles navigation between pages (Home, About, Projects, etc.). |
| **styled-components** | Used for writing CSS directly inside JavaScript (CSS-in-JS). |
| **framer-motion** | Powers the smooth entrance animations and transitions. |
| **react-icons** | Provides a huge library of icons (GitHub, LinkedIn, etc.). |
| **gh-pages** | Simplifies deploying the build to GitHub Pages. |

### ⚙️ Backend (Inside `/server`)
| Package | Purpose |
| :--- | :--- |
| **express** | The framework for building the API endpoints. |
| **mysql2** | The driver that allows Node.js to communicate with MySQL. |
| **dotenv** | Loads secret keys/credentials from a `.env` file for security. |
| **cors** | Allows the frontend (localhost:3000) to talk to the backend (localhost:5000). |
| **ts-node-dev** | Restarts the server automatically when you save changes during development. |

### 🛠️ Global / Development
| Package | Purpose |
| :--- | :--- |
| **concurrently** | Allows running both the frontend and backend with one single command. |
| **typescript** | Adds "types" to JavaScript to catch bugs early and improve code quality. |

---

## ⌨️ Essential Terminal Commands

### 📁 1. Restructuring (Organization)
We used these to move files into separate folders:
- `mkdir client, server`: Creates new folders.
- `Move-Item -Path src, public... -Destination client`: Moves files (PowerShell).

### 🛠️ 2. Dependency Management
- `npm install <package-name>`: Installs a library.
- `npm install --save-dev <package-name>`: Installs a tool used only for development.
- `npm uninstall <package-name>`: Removes a library (like we did for `mongoose`).

### 🚀 3. Running the Project
From the **Root Folder**:
- `npm run install:all`: Installs all dependencies for both folders at once.
- **`npm run start:all`**: The main command to start both frontend and backend together.
- `npm run start:server`: Starts only the backend.
- `npm run start:client`: Starts only the frontend.

---

## 💡 Important Techniques Used
1. **`.env` Files**: Used to hide your database password and port number.
2. **Automatic Table Creation**: We added code in `server/src/config/database.ts` so you don't have to manually create the `portfolio` table in phpMyAdmin.
3. **Fetch API**: Used in the frontend (`Contact/index.tsx`) to "POST" data to the backend.
4. **Public Folder Assets**: Keeping `resume.pdf` in the `public` folder makes it easily accessible for direct downloads.
