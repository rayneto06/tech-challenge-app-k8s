"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CheckPaymentStatus {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(orderId) {
        const status = await this.orderRepository.getOrderPaymentStatusById(orderId);
        return status;
    }
}
exports.default = CheckPaymentStatus;
//# sourceMappingURL=CheckPaymentStatus.js.map