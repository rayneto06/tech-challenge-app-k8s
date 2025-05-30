"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/orderRoutes.ts
const express_1 = __importDefault(require("express"));
const OrderRepository_1 = __importDefault(require("../repositories/OrderRepository"));
const CreateOrder_1 = __importDefault(require("../domain/useCases/Order/CreateOrder"));
const CheckPaymentStatus_1 = __importDefault(require("../domain/useCases/Order/CheckPaymentStatus"));
const HandlePaymentWebhook_1 = __importDefault(require("../domain/useCases/Order/HandlePaymentWebhook"));
const ListOrders_1 = __importDefault(require("../domain/useCases/Order/ListOrders"));
const UpdateOrderStatus_1 = __importDefault(require("../domain/useCases/Order/UpdateOrderStatus"));
const router = express_1.default.Router();
const orderRepository = new OrderRepository_1.default();
const createOrder = new CreateOrder_1.default(orderRepository);
const checkPaymentStatus = new CheckPaymentStatus_1.default(orderRepository);
const handlePaymentWebhook = new HandlePaymentWebhook_1.default(orderRepository);
const listOrders = new ListOrders_1.default(orderRepository);
const updateOrderStatus = new UpdateOrderStatus_1.default(orderRepository);
// Endpoint: Checkout Order (Create Order)
router.post('/checkout', async (req, res) => {
    try {
        const orderData = req.body; // should include products, customer, etc.
        const newOrder = await createOrder.execute(orderData);
        res.status(201).json({ orderId: newOrder._id });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Endpoint: Consult Payment Status for an Order
router.get('/:id/payment-status', async (req, res) => {
    try {
        const orderId = req.params.id;
        const paymentStatus = await checkPaymentStatus.execute(orderId);
        res.json({ paymentStatus });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Endpoint: Webhook to receive payment confirmation (mock)
router.post('/webhook', async (req, res) => {
    try {
        const payload = req.body; // expected: { orderId: string, paymentStatus: 'aprovado' | 'recusado' }
        await handlePaymentWebhook.execute(payload);
        res.status(200).json({ message: 'Webhook processed' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Endpoint: List Orders (excluding finalized), sorted by custom criteria
router.get('/', async (req, res) => {
    try {
        const orders = await listOrders.execute();
        res.json(orders);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Endpoint: Update Order Status (for updating the flow)
router.put('/:id/status', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body; // new status, e.g., 'emPreparacao', 'pronto', etc.
        const updatedOrder = await updateOrderStatus.execute(orderId, status);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map