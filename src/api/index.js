import { Router } from 'express';

import addUser from './add_user.js';
import orderItem from './add_order.js';
import getOrders from './get_orders.js';
import deleteItem from './delete_order.js';
import deleteUser from './delete_user.js';
import addReceipt from './add_receipt.js';
import getReceipts from './get_receipts.js';

export default (repository) => {
  const router = Router();

  router.post('/users/:userId', addUser(repository));
  router.post('/users/:userId/orders/:orderId', orderItem(repository));

  router.get('/users/:userId/orders', getOrders(repository));

  router.delete('/users/:userId/orders/:orderId', deleteItem(repository));
  router.delete('/users/:userId', deleteUser(repository));

  router.post('/users/:userId/receipts/:receiptId', addReceipt(repository));
  router.get('/users/:userId/receipts', getReceipts(repository));

  return router;
};
