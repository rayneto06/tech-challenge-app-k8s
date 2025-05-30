"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../entities/order");
class CreateOrderQRCode {
    constructor(orderRepository, externalPaymentRepository) {
        this.orderRepository = orderRepository;
        this.externalPaymentRepository = externalPaymentRepository;
    }
    async execute({ orderId }) {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.status !== order_1.OrderStatus.RECEBIDO) {
            throw new Error('Order status must be RECEBIDO to generate QR code');
        }
        if (order.paymentStatus !== order_1.PaymentStatus.PENDENTE) {
            throw new Error('Order payment status must be PENDENTE to generate QR code');
        }
        if (order.total) {
            throw new Error('Amount does not match order total');
        }
        const qrCode = await this.generateQRCode(orderId, order.total);
        return qrCode;
    }
    async generateQRCode(orderId, amount) {
        const qrCodeDetails = {
            cash_out: {
                amount
            },
            description: 'COMBO LANCHE',
            title: 'Order - FIAP TECH CHALLENGE',
            total_amount: amount,
            external_reference: orderId
        };
        const response = await this.externalPaymentRepository.createOrder(orderId, qrCodeDetails);
        await this.externalPaymentRepository.assignQRCode(qrCodeDetails);
        return response.qr_data;
    }
}
exports.default = CreateOrderQRCode;
//# sourceMappingURL=CreateOrderQRCode.js.map