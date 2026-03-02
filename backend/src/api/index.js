import { Router } from 'express';

import addUser from './add_user.js';
import orderItem from './add_order.js';
import getOrders from './get_orders.js';
import deleteItem from './delete_order.js';
import deleteUser from './delete_user.js';
import addReceipt from './add_receipt.js';
import getReceipts from './get_receipts.js';
import getMenu from './get_menu.js';

export default () => {
  const router = Router();

  router.post('/users/:userId', addUser);
  router.post('/users/:userId/orders/:orderId', orderItem);

  router.get('/users/:userId/orders', getOrders);

  router.delete('/users/:userId/orders/:orderId', deleteItem);
  router.delete('/users/:userId', deleteUser);

  router.post('/users/:userId/receipts/:receiptId', addReceipt);
  router.get('/users/:userId/receipts', getReceipts);

  router.get('/menu', getMenu);

  return router;
};
