const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/openapi.yaml');

const app = express();
const cors = require('cors');

app.use(cors());

const dataFilePath = path.join(__dirname, 'data.json');

const readData = () => {
    try {
        const rawData = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error('Error reading data from file:', err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data to file:', err);
    }
};

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/products', (req, res) => {
    const products = readData();
    res.status(200).json(products);
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    if (newProduct && newProduct.name && newProduct.price && newProduct.quantity) {
        const products = readData();
        newProduct.id = (products.length + 1).toString(); 
        products.push(newProduct);
        writeData(products); 
        res.status(201).json(newProduct);
    } else {
        res.status(400).json({ error: 'Invalid product data' });
    }
});

app.get('/products/:productId', (req, res) => {
    const products = readData();
    const product = products.find(p => p.id === req.params.productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.put('/products/:productId', (req, res) => {
    const products = readData();
    const product = products.find(p => p.id === req.params.productId);
    if (product) {
        const updatedProduct = req.body;
        Object.assign(product, updatedProduct);
        writeData(products);  
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.delete('/products/:productId', (req, res) => {
    const products = readData();
    const index = products.findIndex(p => p.id === req.params.productId);
    if (index !== -1) {
        products.splice(index, 1);
        writeData(products); 
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});