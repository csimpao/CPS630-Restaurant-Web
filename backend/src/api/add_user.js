import User from '../models/User.js';

const addUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const existing = await User.findOne({ userId });
    if (existing) {
      return res.status(200).json({ message: 'user already exists' });
    }
    await User.create({ userId });
    res.status(200).json({ message: 'user created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default addUser;
