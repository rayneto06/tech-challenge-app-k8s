"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../entities/order");
class ViewOrder {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute(id) {
        if (!id) {
            throw new Error('Order id is required.');
        }
        const order = await this.orderRepository.getOrderById(id);
        if (!order) {
            throw new Error('Order not found.');
        }
        return new order_1.Order(order);
    }
    async executeAll() {
        const orders = await this.orderRepository.getAll();
        return orders?.map((order) => new order_1.Order(order)) || [];
    }
    async executeActive() {
        const orders = await this.orderRepository.getAllActive();
        return orders?.map((order) => new order_1.Order(order)) || [];
    }
    async executeStatusById(id) {
        const orderStatus = await this.orderRepository.getOrderStatusById(id);
        return orderStatus;
    }
    async executePaymentStatusById(id) {
        const orderPaymentStatus = await this.orderRepository.getOrderPaymentStatusById(id);
        return orderPaymentStatus;
    }
}
exports.default = ViewOrder;
//# sourceMappingURL=ViewOrder.js.map