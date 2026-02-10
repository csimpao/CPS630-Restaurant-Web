const getReceipts = (repository) => (req, res) => {
  const { userId } = req.params;

  const receipts = repository.getReceipts(userId);
  if (receipts) {
    res.status(200).json(receipts);
  } else {
    res.status(400).json({
      message: 'invalid user',
    });
  }
};

export default getReceipts;
