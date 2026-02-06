const addUser = (repository) => (req, res) => {
  const { userId } = req.params;

  const success = repository.addUser(userId);
  if (success) {
    res.status(200).json({
      message: 'success',
    });
  } else {
    res.status(400).json({
      message: 'user already exists',
    });
  }
};

export default addUser;
