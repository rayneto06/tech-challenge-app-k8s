"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../entities/order");
class ListOrders {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async execute() {
        // Retrieve all orders from the repository
        const orders = await this.orderRepository.getAllOrders();
        // Filter out orders with status FINALIZADO
        const activeOrders = orders.filter((order) => order.status !== order_1.OrderStatus.FINALIZADO);
        // Define custom sorting order for statuses: PRONTO > PREPARANDO > RECEBIDO
        const statusPriority = {
            [order_1.OrderStatus.PRONTO]: 1,
            [order_1.OrderStatus.PREPARANDO]: 2,
            [order_1.OrderStatus.RECEBIDO]: 3
        };
        activeOrders.sort((a, b) => {
            const priorityA = statusPriority[a.status] || 100;
            const priorityB = statusPriority[b.status] || 100;
            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }
            // If statuses are equal, sort by creation date (oldest first)
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        return activeOrders;
    }
}
exports.default = ListOrders;
//# sourceMappingURL=ListOrders.js.map