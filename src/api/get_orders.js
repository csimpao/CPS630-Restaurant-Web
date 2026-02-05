const getOrders = (repository) => (req, res) => {
  const { userId } = req.params;

  const todos = repository.getOrders(userId);
  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(400).json({
      message: 'invalid user',
    });
  }
};

export default getOrders;
