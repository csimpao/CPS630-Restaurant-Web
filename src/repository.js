export default class Repository {
  constructor() {
    this.dict = {};
  }

  addUser(userId) {
    if (this.dict[userId]) {
      return false;
    } else {
      this.dict[userId] = {};
      return true;
    }
  }

  deleteUser(userId) {
    delete this.dict[userId];
  }

  orderItem(userId, orderId, todo) {
    const userOrders = this.dict[userId];

    if (userOrders) {
      this.dict[userId][orderId] = todo;
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
}
