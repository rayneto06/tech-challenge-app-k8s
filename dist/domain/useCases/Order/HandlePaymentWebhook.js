"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../../domain/entities/order");
class HandlePaymentWebhook {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(payload) {
        const { orderId, paymentStatus } = payload;
        // If payment is approved (i.e. PAGO), update order status to PREPARANDO.
        const newOrderStatus = paymentStatus === order_1.PaymentStatus.PAGO ? order_1.OrderStatus.PREPARANDO : undefined;
        await this.orderRepository.updateOrder(orderId, {
            paymentStatus,
            ...(newOrderStatus ? { status: newOrderStatus } : {}),
            updatedAt: new Date()
        });
    }
}
exports.default = HandlePaymentWebhook;
//# sourceMappingURL=HandlePaymentWebhook.js.map