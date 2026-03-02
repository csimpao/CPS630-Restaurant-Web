import User    from '../models/User.js';
import Order   from '../models/Order.js';
import Receipt from '../models/Receipt.js';

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOneAndDelete({ userId });
    if (!user) {
      return res.status(400).json({ message: 'invalid user' });
    }

    await Order.deleteMany({ userId });
    await Receipt.deleteMany({ userId });
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default deleteUser;
