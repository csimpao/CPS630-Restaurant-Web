const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/menu.html'));
});

app.listen(PORT, () => { console.log("Server started on port: " + PORT) });