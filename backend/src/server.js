import express from 'express';
import api from './api/index.js';
import Repository from './repository.js';


const PORT = 8080;
const MENU_ITEMS = [
  { id: 'calamari', name: 'Calamari', category: 'Appetizers', price: 12.99 },
  { id: 'scallops', name: 'Fried Scallops', category: 'Appetizers', price: 13.99 },
  { id: 'salad', name: 'Grilled Chicken Salad', category: 'Appetizers', price: 11.99 },
  { id: 'cordon-bleu', name: 'Chicken Cordon Bleu', category: 'Mains', price: 19.99 },
  { id: 'tomahawk', name: 'Tomahawk Steak w/ Red Wine Reduction', category: 'Mains', price: 34.99 },
  { id: 'tacos', name: 'Birria Tacos', category: 'Mains', price: 16.99 },
  { id: 'tiramisu', name: 'Tiramisu', category: 'Dessert', price: 8.99 },
  { id: 'black-forest', name: 'Black Forest Cake', category: 'Dessert', price: 8.49 },
  { id: 'puffs', name: 'Ice Cream Puffs', category: 'Dessert', price: 7.49 }
];

function main() {
  const app = express();
  const repository = new Repository();

  app.use(express.json());
  app.use('/api', api(repository));
  
  app.get('/api/menu', (req, res) => {
    res.json(MENU_ITEMS);
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`server listening on port: ${PORT}`);
  });
}

main();
