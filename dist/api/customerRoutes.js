"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerController_1 = require("../controllers/customer/customerController");
const CustomerRepository_1 = __importDefault(require("../repositories/CustomerRepository"));
const router = express_1.default.Router();
const customerRepository = new CustomerRepository_1.default();
const customerController = new customerController_1.CustomerController(customerRepository);
// Create Customer
router.post('/', async (req, res) => {
    try {
        const { cpf, email, name } = req.body;
        const customer = await customerController.createCustomer({ cpf, email, name });
        res.status(201).json(customer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// List All Customers
router.get('/', async (req, res) => {
    try {
        const customers = await customerController.listAllCustomers();
        res.json(customers);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Get Customer by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await customerController.findCustomerById({ id });
        res.json(customer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Get Customer by CPF
router.get('/cpf/:cpf', async (req, res) => {
    try {
        const cpf = req.params.cpf;
        const customer = await customerController.findCustomerByCPF({ cpf });
        res.json(customer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Get Customer by Email
router.get('/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const customer = await customerController.findCustomerByEmail({ email });
        res.json(customer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Update Customer
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCustomer = await customerController.updateCustomer({ id, customerData: req.body });
        res.json(updatedCustomer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Delete Customer
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await customerController.deleteCustomer({ id });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=customerRoutes.js.map