import User  from '../models/User.js';
import Order from '../models/Order.js';

const getOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({ message: 'invalid user' });
    }
    const docs = await Order.find({ userId });

    const orders = {};
    for (const doc of docs) {
      orders[doc.orderId] = doc.order;
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getOrders;
