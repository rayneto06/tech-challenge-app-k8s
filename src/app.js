// src/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger_output.json');

const customerRoutes = require('./api/customerRoutes');
const productRoutes = require('./api/productRoutes');
const orderRoutes = require('./api/orderRoutes');
const mercadoPagoRoutes = require('./api/mercadoPagoRoutes');

const app = express();
app.use(bodyParser.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mount routes
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', mercadoPagoRoutes);

// Health check
app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'OK' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Tech-Challenge API listening on port ${port}`);
});

module.exports = app;
