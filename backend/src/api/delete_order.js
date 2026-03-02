import Order from '../models/Order.js';

const deleteItem = async (req, res) => {
  const { userId, orderId } = req.params;
  try {
    const result = await Order.findOneAndDelete({ userId, orderId });
    if (!result) {
      return res.status(400).json({ message: 'invalid user or order' });
    }
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteItem;
