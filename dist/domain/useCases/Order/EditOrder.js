"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditOrder {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(id, order) {
        if (!id) {
            throw new Error('Order id is required.');
        }
        if (!order) {
            throw new Error('Order object is required.');
        }
        return this.orderRepository.updateOrder(id, { ...order, updatedAt: new Date() });
    }
    async executeStatus(id, orderStatus, paymentStatus) {
        if (!id) {
            throw new Error('Order id is required.');
        }
        return this.orderRepository.updateOrderStatus(id, {
            status: orderStatus,
            paymentStatus: paymentStatus
        });
    }
}
exports.default = EditOrder;
//# sourceMappingURL=EditOrder.js.map