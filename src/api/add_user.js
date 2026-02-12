const addUser = (repository) => (req, res) => {
  const { userId } = req.params;

  const success = repository.addUser(userId);
  

  // support guest being the only user registered before connecting to database
  res.status(200).json({
    message: success ? 'user created' : 'user already exists',
  });
};

export default addUser;
