const orderItem = (repository) => (req, res) => {
  const { userId, orderId } = req.params;
  const { order } = req.body;

  const success = repository.orderItem(userId, orderId, order);
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

export default orderItem;
