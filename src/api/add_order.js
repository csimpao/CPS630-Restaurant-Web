const orderItem = (repository) => (req, res) => {
  const { userId, orderId } = req.params;
  const { todo } = req.body;

  const success = repository.orderItem(userId, orderId, todo);
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
