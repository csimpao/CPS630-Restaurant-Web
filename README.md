# CPS 630 A2: Restaurant CRUD Application

## Overview
This project is a full-stack restaurant ordering web application for CPS 630 (Winter 2026).

It lets a user:
- Browse menu items.
- Create and manage orders.
- Confirm orders and view receipts.

### Future Extensions
Possible future improvements include:
- Authentication and role-based access (customer/admin).
- Order status workflow (pending, preparing, completed).
- Payment integration.
- Search/filter/sort for menu items and order history.
- Admin dashboard for menu management.

## Tech Stack
- Back-End: Node.js, Express, Mongoose, MongoDB
- Front-End: React, Vite, React Router
- Data: MongoDB collections for users, orders, receipts, and menu items

## Project Structure
- `backend/` - Express API and MongoDB models
- `frontend/` - React + Vite client app

## Back-End Checklist
- Node.js + Express API: Implemented in `backend/src/server.js` and `backend/src/api/*`.
- MongoDB database connection: Implemented via `mongoose.connect(process.env.MONGODB_URI)`.
- Startup test data seeding function: Implemented in `backend/src/seed.js`.
  - On server startup, the app checks whether menu items already exist.
  - If the menu collection is empty, it inserts seed menu data.
- Runs on `localhost:8080`: Server listens on port `8080`.

## Front-End Checklist
- React + Vite application: Implemented in `frontend/`.
- At least 3 different web views:
  - `/menu`
  - `/orders`
  - `/receipt`
- CRUD-supported view(s):
  - The Orders flow supports create/read/update/delete behavior through API calls.
- Runs on `localhost:5173`: Vite dev server runs on port `5173`.

## REST API (CRUD)
Base URL: `http://localhost:8080/api`

### Menu
- `GET /menu`
  - Purpose: Read multiple menu items.
  - Success: `200 OK`

### Users
- `POST /users/:userId`
  - Purpose: Create user if missing.
  - Success: `200 OK`
  - Error: `500 Internal Server Error`

### Orders
- `POST /users/:userId/orders/:orderId`
  - Purpose: Create or update an order (upsert behavior).
  - Success: `200 OK`
  - Client error: `400 Bad Request` (invalid user)
  - Error: `500 Internal Server Error`

- `GET /users/:userId/orders`
  - Purpose: Read multiple orders for a user.
  - Success: `200 OK`
  - Client error: `400 Bad Request` (invalid user)
  - Error: `500 Internal Server Error`

- `DELETE /users/:userId/orders/:orderId`
  - Purpose: Delete an order.
  - Success: `200 OK`
  - Client error: `400 Bad Request` (invalid user or order)
  - Error: `500 Internal Server Error`

### Receipts
- `POST /users/:userId/receipts/:receiptId`
  - Purpose: Create a receipt.
  - Success: `200 OK`
  - Client error: `400 Bad Request` (invalid user)
  - Error: `500 Internal Server Error`

- `GET /users/:userId/receipts`
  - Purpose: Read multiple receipts.
  - Success: `200 OK`
  - Client error: `400 Bad Request` (invalid user)
  - Error: `500 Internal Server Error`

## Setup and Run

## 1) Back-End (localhost:8080)
From the project root:

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=your_mongodb_connection_string
```

Start the back-end:

```bash
npm run start
```

If your `backend/package.json` does not yet define `start`, use:

```bash
npm run dev
```

Back-end URL:
- `http://localhost:8080`

## 2) Front-End (localhost:5173)
In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Front-end URL:
- `http://localhost:5173`

## How to Use the App
1. Open `http://localhost:5173/menu`.
2. Select quantities and create an order.
3. Go to `/orders` to view current orders.
4. Update quantities or remove specific items/orders.
5. Confirm order to generate a receipt.
6. Go to `/receipt` to view receipt history and totals.

## Notes
- The seed function only inserts menu data when the menu collection is empty.

## Reflection
- Overview: restaurant web app take saves users orders and receipts using MongoDB
- Ongoing communication between team members to connect different parts as we are building asynchronously
- Refactoring static HTML pages to React components
- Thinking considerably on system design to modularize React components
- Testing the app and brainstorming edge cases as it was refactored to React
- Ensuring errors are handled from both backend and frontend
- Validating inputs on both frontend and backend to ensure validity of requests
- Setting up MongoDB as a cluster on the cloud, so it will run 24/7
