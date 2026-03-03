import User  from '../models/User.js';
import Order from '../models/Order.js';

const orderItem = async (req, res) => {
  const { userId, orderId } = req.params;
  const { order } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(400).json({ message: 'invalid user' });
    }
    await Order.findOneAndUpdate(
      { userId, orderId },
      { order },
      { upsert: true, new: true },
    );
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default orderItem;
