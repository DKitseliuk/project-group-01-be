🇺🇦 [Ukrainian version](README.uk.md)

# 🌿 Natural Travels Backend

Backend service for the **Natural Travels** platform — a web application for discovering, creating, and reviewing travel locations across Ukraine.

This API handles authentication, user management, locations, feedback, and categories.

---

## 🚀 Features

### 🔐 Authentication
- Register user
- Login user
- Logout (private)
- Refresh session
- Authorization middleware

### 👤 Users
- Get current user (private)
- Get public user by ID
- Get user locations (with pagination)
- Update profile (private)

### 📍 Locations
- Create location (private)
- Get all locations with:
  - pagination
  - filtering (region, type)
  - search
- Get location by ID
- Update location (author only)

### 🗂 Categories
- Get regions
- Get location types

### ⭐ Feedback
- Get feedbacks for location
- Create feedback (private)

---

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- celebrate (validation)
- multer + cloudinary (file upload)
- nodemailer (emails)
- pino (logging)
- dotenv, cors

---

## 🧱 API Structure

### `/api/auth`
- POST `/register`
- POST `/login`
- POST `/logout`
- POST `/refresh`

### `/api/users`
- GET `/current`
- GET `/:userId`
- GET `/:userId/locations`
- PATCH `/current`

### `/api/locations`
- POST `/`
- GET `/`
- GET `/:locationId`
- PATCH `/:locationId`

### `/api/categories`
- GET `/regions`
- GET `/types`

### `/api/feedbacks`
- GET `/:locationId`
- POST `/`

---

## ✅ Validation

### Auth
- name: 2–32 chars
- email: valid, unique
- password: 8–128 chars

### Location
- name: 3–96
- type: required
- region: required
- description: 20–6000
- images: jpg/png, <1MB

### Review
- rate: 1–5
- description: 1–200

---

## ⚙️ Getting Started

```bash
npm install
npm run dev

## 🌐 Environment Configuration

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# DATABASE
MONGO_URL=

# FRONTEND DOMAIN
FRONTEND_DOMAIN=

# JWT
JWT_SECRET=

# MAIL
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

# PORT
PORT=

# NODE ENVIRONMENT
NODE_ENV=

## ✨ Highlights

- REST API architecture
- Protected and public routes
- Pagination, filtering, and search
- Validation middleware
- Error handling
- File upload with cloud storage
- Session management
- Logging

---

## 📘 API Documentation

API endpoints are structured and documented within the codebase.
