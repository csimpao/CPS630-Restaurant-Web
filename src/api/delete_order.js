const deleteItem = (repository) => (req, res) => {
  const { userId, orderId } = req.params;

  const success = repository.deleteItem(userId, orderId);
  if (success) {
    res.status(200).json({
      message: 'success',
    });
  } else {
    res.status(400).json({
      message: 'invalid user or todo',
    });
  }
};

export default deleteItem;
