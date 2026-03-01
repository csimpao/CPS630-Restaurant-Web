const deleteUser = (repository) => (req, res) => {
  const { userId } = req.params;

  const success = repository.deleteUser(userId);
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

export default deleteUser;
