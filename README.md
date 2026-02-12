# The Node Restaurant Web App

## Overview
The Node Restaurant Web App is a full-stack restaurant ordering demo built with Node.js, Express, and HTML/CSS/JavaScript.

Its core purpose is to simulate a basic restaurant ordering workflow:
1. Browse a menu.
2. Create an order.
3. Review/edit/delete orders.
4. Confirm and view a receipt.

The backend currently stores data in memory (no database) using a JSON object.

## Important Files Summary
- `src/server.js`: Application entry point. Configures Express, static file hosting, API routing, menu endpoint, page routes, and server startup on port `8080`.
- `src/repository.js`: In-memory data store for users, orders, and receipts.
- `src/api/index.js`: Central API router wiring endpoint handlers.
- `src/api/*.js`: Individual REST handlers for add/get/delete user/order/receipt operations.
- `public/js/menu.js`: Loads menu items and creates orders from quantity inputs.
- `public/js/orders.js`: Displays orders, allows deletion of full orders and individual items, computes totals, confirms order into receipt data.
- `public/js/receipt.js`: Loads and displays saved receipts with subtotals and grand total.
- `views/menu.html`, `views/orders.html`, `views/receipt.html`: Main UI pages for the app flow.
- `src/repository.test.js`: Jest unit tests for repository behavior.
- `package.json`: Scripts and project dependencies.

## How To Run The Project
### Install dependencies
```bash
npm install
```

### Start the app
```bash
npm run dev
```

Server starts at:
- `http://localhost:8080`

Open the menu route to get the main menu page:
- `http://localhost:8080/menu`

## How To Use The Web App
1. Go to `/menu`.
2. Enter quantities for one or more menu items by utilizing the stepper.
3. Click **Create Order**.
4. Click **View Orders** to review/edit quantities and see total cost.
5. On `/orders`, click **Delete Order** beside any order to remove the full order.
6. On `/orders`, click **X** beside any item to remove only that item from the order.
7. Click **Confirm Order** to finalize and generate a receipt.
8. On `/receipt`, review subtotal(s) and grand total.
9. Use navigation buttons to return to menu or edit orders.

## API Overview
### Menu
- `GET /api/menu` - Returns static menu items.

### Users
- `POST /api/users/:userId` - Creates a user if not already present.
- `DELETE /api/users/:userId` - Deletes user data.

### Orders
- `POST /api/users/:userId/orders/:orderId` - Saves an order payload.
- `GET /api/users/:userId/orders` - Returns all current orders for the user.
- `DELETE /api/users/:userId/orders/:orderId` - Deletes a specific order.

### Receipts
- `POST /api/users/:userId/receipts/:receiptId` - Saves a receipt payload.
- `GET /api/users/:userId/receipts` - Returns all receipts for the user.

## Testing
Run the following command

```bash
npm run test
```

Current unit tests cover repository operations in `src/repository.test.js`.

### Reflection

#### Challenges and Successes

- Configured the repository pattern successfully to ensure scalability and ease of access when hooking the code up with a database
- Dynamically creating HTML elements using JavaScript to ensure modularity and flexibility for displaying menu items
- Handling pull requests between teammates with ease and adequate communication
- Understanding the repository pattern in order to apply it to our codebase
- Handling different states of the app depending on what is returned from the backend
