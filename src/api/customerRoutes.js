// src/api/customerRoutes.js
const express = require('express');
const CustomerRepository = require('../repositories/CustomerRepository');
const CreateCustomer = require('../domain/useCases/Customers/CreateCustomer');
const ViewCustomer = require('../domain/useCases/Customers/ViewCustomer');

const router = express.Router();
const repo = new CustomerRepository();

// Create Customer
router.post('/', async (req, res) => {
  try {
    const { name, email, cpf } = req.body;
    const useCase = new CreateCustomer(repo);
    const customer = await useCase.execute({ name, email, cpf });
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Customers
router.get('/', async (_req, res) => {
  try {
    const useCase = new ViewCustomer(repo);
    const customers = await useCase.execute();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Customer by ID
router.get('/:id', async (req, res) => {
  try {
    const useCase = new ViewCustomer(repo);
    const customer = await useCase.execute({ id: req.params.id });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
