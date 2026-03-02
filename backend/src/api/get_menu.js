import MenuItem from '../models/MenuItem.js';

const getMenu = async (req, res) => {
  const items = await MenuItem.find({});
  res.json(items);
};

export default getMenu;
