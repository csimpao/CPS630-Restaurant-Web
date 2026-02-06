const getOrders = (repository) => (req, res) => {
  const { userId } = req.params;

  const orders = repository.getOrders(userId);
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400).json({
      message: 'invalid user',
    });
  }
};

export default getOrders;
