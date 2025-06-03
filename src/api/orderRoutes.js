// src/api/orderRoutes.js
const express = require('express');
const OrderRepository = require('../repositories/OrderRepository');
const CreateOrder = require('../domain/useCases/Order/CreateOrder');
const ViewOrder = require('../domain/useCases/Order/ViewOrder');
const UpdateOrderStatus = require('../domain/useCases/Order/UpdateOrderStatus');
const CheckPaymentStatus = require('../domain/useCases/Order/CheckPaymentStatus');
const HandlePaymentWebhook = require('../domain/useCases/Order/HandlePaymentWebhook');

const router = express.Router();
const repo = new OrderRepository();

// List Orders (all active)
router.get('/', async (_req, res) => {
  try {
    const useCase = new ViewOrder(repo);
    const orders = await useCase.execute({ onlyActive: true });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Order by ID
router.get('/:id', async (req, res) => {
  try {
    const useCase = new ViewOrder(repo);
    const order = await useCase.execute({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Checkout Order
router.post('/checkout', async (req, res) => {
  try {
    const { customerId, combo, total } = req.body;
    const useCase = new CreateOrder(repo);
    const order = await useCase.execute({ customerId, combo, total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Check Payment Status
router.get('/:id/payment-status', async (req, res) => {
  try {
    const useCase = new CheckPaymentStatus(repo);
    const statusObj = await useCase.execute({ id: req.params.id });
    if (!statusObj) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(statusObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Order Status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const useCase = new UpdateOrderStatus(repo);
    const updated = await useCase.execute({ id: req.params.id, status });
    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mock Payment Webhook (handled by HandlePaymentWebhook use case)
router.post('/webhook', async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;
    const useCase = new HandlePaymentWebhook(repo);
    const result = await useCase.execute({ orderId, paymentStatus });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
