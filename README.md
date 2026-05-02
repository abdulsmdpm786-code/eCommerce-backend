***

### 2. Backend Repository README (`backend/README.md`)

```markdown
# ⚙️ Backend - Express Authentication API

This repository contains the backend REST API for the Full-Stack Authentication App. It provides secure user registration, password encryption, and JSON Web Token (JWT) generation using a Node.js/Express server and a MongoDB database.

## ✨ Key Features
* **Secure Authentication:** Implements JWT for stateless, secure user sessions.
* **Password Hashing:** Uses `bcrypt` to encrypt user passwords before saving them to the database.
* **Data Validation:** Prevents duplicate user registrations (E11000 duplicate key error handling).
* **RESTful Architecture:** Clean, standardized JSON responses with proper HTTP status codes (200, 201, 400, 401, 404, 500).

## 🛠️ Tech Stack
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ORM
* **Security:** `bcrypt` (Hashing), `jsonwebtoken` (Auth Tokens)

## 🚀 Getting Started

### Prerequisites
* Node.js installed
* A local MongoDB instance or a MongoDB Atlas URI
