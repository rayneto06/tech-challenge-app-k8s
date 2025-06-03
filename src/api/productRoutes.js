// src/api/productRoutes.js
const express = require('express');
const ProductRepository = require('../repositories/ProductRepository');
const CreateProduct = require('../domain/useCases/Products/CreateProduct');
const ViewProduct = require('../domain/useCases/Products/ViewProduct');
const EditProduct = require('../domain/useCases/Products/EditProduct');
const DeleteProduct = require('../domain/useCases/Products/DeleteProduct');

const router = express.Router();
const repo = new ProductRepository();

// Create Product
router.post('/', async (req, res) => {
  try {
    const { name, category, description, price, imageUrl } = req.body;
    const useCase = new CreateProduct(repo);
    const product = await useCase.execute({ name, category, description, price, imageUrl });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Products
router.get('/', async (_req, res) => {
  try {
    const useCase = new ViewProduct(repo);
    const products = await useCase.execute();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const useCase = new ViewProduct(repo);
    const product = await useCase.execute({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Products by Category
router.get('/category/:category', async (req, res) => {
  try {
    const useCase = new ViewProduct(repo);
    const products = await useCase.execute({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Product
router.put('/:id', async (req, res) => {
  try {
    const { name, category, description, price, imageUrl } = req.body;
    const useCase = new EditProduct(repo);
    const updated = await useCase.execute({
      id: req.params.id,
      updates: { name, category, description, price, imageUrl }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    const useCase = new DeleteProduct(repo);
    await useCase.execute({ id: req.params.id });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
