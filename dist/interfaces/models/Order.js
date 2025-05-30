"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = require("../../domain/entities/order");
const OrderSchema = new mongoose_1.default.Schema({
    combo: { type: Array, required: true },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Customer', required: false },
    total: { type: Number, required: true },
    status: { type: String, required: true, default: order_1.OrderStatus.RECEBIDO },
    paymentStatus: { type: String, required: true, default: order_1.PaymentStatus.PENDENTE },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});
exports.OrderSchema = OrderSchema;
const Order = mongoose_1.default.model('Order', OrderSchema);
exports.Order = Order;
//# sourceMappingURL=Order.js.map