"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const CreateOrder_1 = __importDefault(require("../../domain/useCases/Order/CreateOrder"));
const CreateOrderQRCode_1 = __importDefault(require("../../domain/useCases/Order/CreateOrderQRCode"));
const ViewOrder_1 = __importDefault(require("../../domain/useCases/Order/ViewOrder"));
const EditOrder_1 = __importDefault(require("../../domain/useCases/Order/EditOrder"));
class OrderController {
    constructor(orderRepository, externalPaymentRepository) {
        this.createOrderUseCase = new CreateOrder_1.default(orderRepository);
        this.viewOrderUseCases = new ViewOrder_1.default(orderRepository);
        this.editOrderUseCase = new EditOrder_1.default(orderRepository);
        this.createOrderQRCodeUseCase = new CreateOrderQRCode_1.default(orderRepository, externalPaymentRepository);
    }
    async createOrder({ customerId, combo }) {
        const order = await this.createOrderUseCase.execute({ customerId, combo });
        return order;
    }
    async viewAllOrders() {
        const order = await this.viewOrderUseCases.executeAll();
        return order;
    }
    async viewOrder({ id }) {
        const order = await this.viewOrderUseCases.execute(id);
        return order;
    }
    async viewActiveOrders() {
        const orders = await this.viewOrderUseCases.executeActive();
        return orders;
    }
    async viewOrderStatus({ id }) {
        const orderStatus = await this.viewOrderUseCases.executeStatusById(id);
        return orderStatus;
    }
    async viewOrderPaymentStatus({ id }) {
        const orderPaymentStatus = await this.viewOrderUseCases.executePaymentStatusById(id);
        return orderPaymentStatus;
    }
    async editOrder({ id, orderData }) {
        const order = await this.editOrderUseCase.execute(id, orderData);
        return order;
    }
    async editOrderStatus({ id, orderStatus, paymentStatus }) {
        const order = await this.editOrderUseCase.executeStatus(id, orderStatus, paymentStatus);
        return order;
    }
    async createOrderPaymentQRCode({ orderId }) {
        const order = await this.createOrderQRCodeUseCase.execute({ orderId });
        return order;
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map