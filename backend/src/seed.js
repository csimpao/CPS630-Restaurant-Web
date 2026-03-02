import MenuItem from './models/MenuItem.js';

const MENU_ITEMS = [
  { id: 'calamari',    name: 'Calamari',                          category: 'Appetizers', price: 12.99 },
  { id: 'scallops',   name: 'Fried Scallops',                    category: 'Appetizers', price: 13.99 },
  { id: 'salad',      name: 'Grilled Chicken Salad',             category: 'Appetizers', price: 11.99 },
  { id: 'cordon-bleu',name: 'Chicken Cordon Bleu',               category: 'Mains',      price: 19.99 },
  { id: 'tomahawk',   name: 'Tomahawk Steak w/ Red Wine Reduction', category: 'Mains',   price: 34.99 },
  { id: 'tacos',      name: 'Birria Tacos',                      category: 'Mains',      price: 16.99 },
  { id: 'tiramisu',   name: 'Tiramisu',                          category: 'Dessert',    price:  8.99 },
  { id: 'black-forest',name: 'Black Forest Cake',                category: 'Dessert',    price:  8.49 },
  { id: 'puffs',      name: 'Ice Cream Puffs',                   category: 'Dessert',    price:  7.49 },
];

export default async function seedDatabase() {
  const count = await MenuItem.countDocuments();
  if (count > 0) return;

  await MenuItem.insertMany(MENU_ITEMS);
  console.log('database seeded with menu items');
}
