import express from 'express';
import path from 'path';

import api from './api/index.js';
import Repository from './repository.js';

const PORT = 8080;

function main() {
  const app = express();
  const repository = new Repository();

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.use('/api', api(repository));

  app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/menu.html'));
  });
  app.get('/end', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/ending.html'));
  });
  app.get('/receipt', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/receipt.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`server listening on port: ${PORT}`);
  });
}

main();
