🇬🇧 [English version](README.md)

# 🌿 Natural Travels Backend

Бекенд-сервіс для платформи **Natural Travels / Природні Мандри**.

API забезпечує авторизацію, роботу з користувачами, локаціями, відгуками та категоріями.

---

## 🚀 Основний функціонал

### 🔐 Авторизація
- Реєстрація
- Логін
- Логаут
- Оновлення сесії
- Middleware авторизації

### 👤 Користувачі
- Отримання поточного користувача
- Отримання користувача за ID
- Отримання локацій користувача
- Оновлення профілю

### 📍 Локації
- Створення локації
- Отримання списку (пагінація, фільтри, пошук)
- Отримання за ID
- Редагування (тільки автор)

### 🗂 Категорії
- Список регіонів
- Список типів

### ⭐ Відгуки
- Отримання відгуків
- Створення відгуку

---

## 🛠 Технології

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcrypt
- celebrate
- multer + cloudinary
- nodemailer
- pino
- dotenv, cors

---

## 🧱 Структура API

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

## ✅ Валідація

### Auth
- name: 2–32 символи
- email: валідний
- password: 8–128

### Location
- name: 3–96
- description: 20–6000
- images: jpg/png <1MB

### Review
- rate: 1–5
- description: 1–200

---

## ⚙️ Запуск

```bash
npm install
npm run dev


## 🌐 Змінні середовища

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


## ✨ Особливості

- REST API архітектура
- Публічні та приватні маршрути
- Пагінація, фільтрація та пошук
- Middleware для валідації
- Обробка помилок
- Завантаження файлів у хмарне сховище
- Керування сесією
- Логування

---

## 📘 Документація API

Ендпоінти структуровані та задокументовані в кодовій базі проєкту.
