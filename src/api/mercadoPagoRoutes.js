// src/api/mercadoPagoRoutes.js
const express = require('express');
const MercadoPagoRepository = require('../repositories/MercadoPagoRepository');
const HandleExternalPaymentWebhook = require('../domain/useCases/Payment/handleExternalPaymentWebhook');

const router = express.Router();
const repo = new MercadoPagoRepository();

router.post('/createPreference', async (req, res) => {
  try {
    const { orderId, total } = req.body;
    const useCase = require('../domain/useCases/Payment/CreatePreference'); // if you have one
    const pref = await useCase.execute({ orderId, total, repo });
    res.json(pref);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/webhook', async (req, res) => {
  try {
    const useCase = new HandleExternalPaymentWebhook(repo);
    const result = await useCase.execute({ body: req.body });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
