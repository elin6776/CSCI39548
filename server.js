// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to fetch products from the JSON file
app.get('/api/products', (req, res) => {
    fs.readFile(path.join(__dirname, 'products.json'), 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading products.json:', err);
            res.status(500).send('Error reading products data');
            return;
        }

        try {
            const products = JSON.parse(data);
            res.json(products);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).send('Error parsing products data');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


