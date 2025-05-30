"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderRepository_1 = __importDefault(require("../repositories/OrderRepository"));
const handleExternalPaymentWebhook_1 = __importDefault(require("../domain/useCases/Payment/handleExternalPaymentWebhook"));
const webhook_1 = __importDefault(require("../controllers/order/externalPayment/webhook"));
const MercadoPagoRepository_1 = __importDefault(require("../repositories/MercadoPagoRepository"));
const router = express_1.default.Router();
const orderRepository = new OrderRepository_1.default();
const mercadoPagoRepository = new MercadoPagoRepository_1.default();
const handleMercadoPagoWebhook = new handleExternalPaymentWebhook_1.default(orderRepository, mercadoPagoRepository);
const externalPaymentWebhookController = new webhook_1.default(handleMercadoPagoWebhook);
router.post('/mercadopago', (req, res) => externalPaymentWebhookController.handle(req, res));
exports.default = router;
//# sourceMappingURL=mercadoPagoRoutes.js.map