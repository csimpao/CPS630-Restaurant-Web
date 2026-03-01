const addReceipt = (repository) => (req, res) => {
  const { userId, receiptId } = req.params;
  const { receipt } = req.body;

  const success = repository.addReceipt(userId, receiptId, receipt);
  if (success) {
    res.status(200).json({
      message: 'success',
    });
  } else {
    res.status(400).json({
      message: 'invalid user',
    });
  }
};

export default addReceipt;
