"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../entities/order");
class CreateOrder {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(orderDTO) {
        const createdAt = new Date();
        const updatedAt = createdAt;
        // Build complete order data without total first.
        const completeOrderData = {
            ...orderDTO,
            _id: undefined,
            createdAt,
            updatedAt
        };
        // Instantiate the Order entity to calculate the total.
        const orderEntity = new order_1.Order(completeOrderData);
        const computedTotal = orderEntity.total;
        // Build the payload including the computed total.
        const payload = { ...completeOrderData, total: computedTotal };
        // Pass the payload to the repository.
        const createdOrder = await this.orderRepository.createOrder(payload);
        return createdOrder;
    }
}
exports.default = CreateOrder;
//# sourceMappingURL=CreateOrder.js.map