// src/api/customerRoutes.js
import express from "express";
import CustomerRepository from "../repositories/CustomerRepository.js";
import CreateCustomer   from "../domain/useCases/Customers/CreateCustomer.js";
import ViewCustomer     from "../domain/useCases/Customers/ViewCustomer.js";

const router = express.Router();
const repo   = new CustomerRepository();

router.post("/customers", async (req, res, next) => {
  try {
    const customer = await new CreateCustomer(repo).execute(req.body);
    res.status(201).json(customer);
  } catch (err) { next(err); }
});

router.get("/customers", async (req, res, next) => {
  try {
    const list = await new ViewCustomer(repo).execute();
    res.json(list);
  } catch (err) { next(err); }
});

router.get("/customers/:id", async (req, res, next) => {
  try {
    const cust = await repo.getById(req.params.id);
    res.json(cust);
  } catch (err) { next(err); }
});

router.get("/customers/cpf/:cpf", async (req, res, next) => {
  try {
    const cust = await repo.getByCPF(req.params.cpf);
    res.json(cust);
  } catch (err) { next(err); }
});

router.get("/customers/email/:email", async (req, res, next) => {
  try {
    const cust = await repo.getByEmail(req.params.email);
    res.json(cust);
  } catch (err) { next(err); }
});

export default router;
