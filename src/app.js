// src/app.js
import express from "express";
import dotenv from "dotenv";

import customerRoutes  from "./api/customerRoutes.js";
import productRoutes   from "./api/productRoutes.js";
import orderRoutes     from "./api/orderRoutes.js";
import mercadoRoutes   from "./api/mercadoPagoRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// Mount all
app.use("/api", customerRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", mercadoRoutes);

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

export default app;
