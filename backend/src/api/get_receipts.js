import Receipt from '../models/Receipt.js';

const getReceipts = async (req, res) => {
  const { userId } = req.params;
  try {
    const docs = await Receipt.find({ userId });
    const receipts = {};
    for (const doc of docs) {
      receipts[doc.receiptId] = doc.receipt;
    }
    res.status(200).json(receipts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getReceipts;