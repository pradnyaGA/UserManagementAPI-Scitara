# UserManagementAPI-Scitara
User Management API 
# User Management API

A simple REST + WebSocket based User Management API built with **Node.js**, **Express**, and **ws**.  
It provides CRUD operations for users and broadcasts real-time updates to connected WebSocket clients.

---

## 🚀 Features
- REST API for user management (`POST`, `GET`, `PUT`, `DELETE`).
- WebSocket server for real-time notifications.
- In-memory user store (can be extended to DB).
- Data-driven testing support with Postman/Newman.

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/user-management-api.git
   cd user-management-api
2. Install dependencies:
   npm install
3. Start the server:
  npm run dev
- REST API runs on http://localhost:3000
- WebSocket server runs on ws://localhost:8080
API Endpoints:
Create UserPOST /users
Get All UsersGET /users
Get User by IDGET /users/:id
Update UserPUT /users/:id
Delete UserDELETE /users/:id

WebSocket EventsClients can connect to ws://localhost:8080 and receive events:- CONNECTED,- USER_CREATED,- USER_UPDATED
Run Unit/API TestsUse Postman or Newman with data-driven CSV/JSON files


 Notes- Current implementation uses an in-memory array for users. Replace with a database (MongoDB, PostgreSQL, etc.) for production.
- WebSocket broadcasts are sent to all connected clients whenever a user is created or updated.
AuthorPradnya Gaikwad
Lead SDET / Senior Full-Stack Developer
Pune, Maharashtra, India
