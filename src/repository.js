export default class Repository {
  constructor() {
    this.dict = {};
    this.receipts = {};
  }

  addUser(userId) {
    if (this.dict[userId]) {
      return false;
    } else {
      this.dict[userId] = {};
      if (!this.receipts[userId]) {
        this.receipts[userId] = {};
      }
      return true;
    }
  }

  deleteUser(userId) {
    delete this.dict[userId];
  }

  orderItem(userId, orderId, order) {
    const userOrders = this.dict[userId];

    if (userOrders) {
      this.dict[userId][orderId] = order;
      return true;
    } else {
      return false;
    }
  }

  deleteItem(userId, orderId) {
    const userOrders = this.dict[userId];

    if (userOrders) {
      delete userOrders[orderId];
      return true;
    } else {
      return false;
    }
  }

  getOrders(userId) {
    return this.dict[userId];
  }

  addReceipt(userId, receiptId, receipt) {
    if (!this.receipts[userId]) {
      this.receipts[userId] = {};
    }
    this.receipts[userId][receiptId] = receipt;
    return true;
  }

  getReceipts(userId) {
    return this.receipts[userId];
  }
}
