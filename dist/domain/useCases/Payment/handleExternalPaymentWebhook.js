"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../entities/order");
class HandleExternalPaymentWebhook {
    constructor(orderRepository, externalPaymentRepository) {
        this.orderRepository = orderRepository;
        this.externalPaymentRepository = externalPaymentRepository;
    }
    async execute(externalPaymentBody) {
        const paymentDetails = await this.fetchPaymentDetails(externalPaymentBody.data.id);
        await this.updateOrderStatus(paymentDetails);
    }
    async fetchPaymentDetails(paymentId) {
        const paymentDetails = await this.externalPaymentRepository.getPaymentDetails(paymentId);
        return paymentDetails;
    }
    async updateOrderStatus(paymentDetails) {
        const orderId = paymentDetails.external_reference;
        const status = paymentDetails.status;
        const orderDTO = await this.orderRepository.getOrderById(orderId);
        if (!orderDTO) {
            throw new Error("Pedido não encontrado");
        }
        // Instantiate the Order entity from the DTO
        const orderEntity = new order_1.Order(orderDTO);
        const mappedOrderStatus = orderEntity.mapPaymentStatusToOrderStatus(status);
        if (mappedOrderStatus === "UNKNOWN") {
            throw new Error("Status desconhecido");
        }
        const { paymentOrderStatus, orderStatus } = mappedOrderStatus;
        await this.orderRepository.updateOrderStatus(orderId, { paymentStatus: paymentOrderStatus, status: orderStatus });
    }
}
exports.default = HandleExternalPaymentWebhook;
//# sourceMappingURL=handleExternalPaymentWebhook.js.map