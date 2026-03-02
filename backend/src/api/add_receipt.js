import Receipt from '../models/Receipt.js';

const addReceipt = async (req, res) => {
  const { userId, receiptId } = req.params;
  const { receipt } = req.body;
  try {
    await Receipt.findOneAndUpdate(
      { userId, receiptId },
      { receipt }
    );
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default addReceipt;
