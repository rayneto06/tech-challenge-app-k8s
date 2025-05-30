"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateOrderStatus {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(orderId, newStatus) {
        return this.orderRepository.updateOrder(orderId, { status: newStatus, updatedAt: new Date() });
    }
}
exports.default = UpdateOrderStatus;
//# sourceMappingURL=UpdateOrderStatus.js.map