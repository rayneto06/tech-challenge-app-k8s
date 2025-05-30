"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Order__id, _Order_combo, _Order_total, _Order_status, _Order_paymentStatus, _Order_customer, _Order_createdAt, _Order_updatedAt;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.ECategory = exports.PaymentStatus = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["RECEBIDO"] = "recebido";
    OrderStatus["PREPARANDO"] = "preparando";
    OrderStatus["PRONTO"] = "pronto";
    OrderStatus["FINALIZADO"] = "finalizado";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDENTE"] = "pendente";
    PaymentStatus["PAGO"] = "pago";
    PaymentStatus["CANCELADO"] = "cancelado";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
var ECategory;
(function (ECategory) {
    ECategory["LANCHE"] = "lanche";
    ECategory["ACOMPANHAMENTO"] = "acompanhamento";
    ECategory["BEBIDA"] = "bebida";
    ECategory["SOBREMESA"] = "sobremesa";
})(ECategory = exports.ECategory || (exports.ECategory = {}));
class Order {
    constructor({ combo, status, _id, customer, createdAt, updatedAt, paymentStatus }) {
        _Order__id.set(this, void 0);
        _Order_combo.set(this, void 0);
        _Order_total.set(this, void 0);
        _Order_status.set(this, void 0);
        _Order_paymentStatus.set(this, void 0);
        _Order_customer.set(this, void 0);
        _Order_createdAt.set(this, void 0);
        _Order_updatedAt.set(this, void 0);
        __classPrivateFieldSet(this, _Order__id, _id, "f");
        __classPrivateFieldSet(this, _Order_combo, combo, "f");
        __classPrivateFieldSet(this, _Order_total, this.calculateTotal(), "f");
        __classPrivateFieldSet(this, _Order_status, status, "f");
        __classPrivateFieldSet(this, _Order_paymentStatus, paymentStatus, "f");
        __classPrivateFieldSet(this, _Order_customer, customer, "f");
        __classPrivateFieldSet(this, _Order_createdAt, createdAt, "f");
        __classPrivateFieldSet(this, _Order_updatedAt, updatedAt, "f");
    }
    get _id() {
        return __classPrivateFieldGet(this, _Order__id, "f");
    }
    get combo() {
        return __classPrivateFieldGet(this, _Order_combo, "f");
    }
    get total() {
        return __classPrivateFieldGet(this, _Order_total, "f");
    }
    get status() {
        return __classPrivateFieldGet(this, _Order_status, "f");
    }
    get paymentStatus() {
        return __classPrivateFieldGet(this, _Order_paymentStatus, "f");
    }
    get customer() {
        return __classPrivateFieldGet(this, _Order_customer, "f");
    }
    get createdAt() {
        return __classPrivateFieldGet(this, _Order_createdAt, "f");
    }
    get updatedAt() {
        return __classPrivateFieldGet(this, _Order_updatedAt, "f");
    }
    calculateTotal() {
        const total = Object.values(this.combo).reduce((sum, item) => {
            return sum + (item?.price || 0);
        }, 0);
        return total;
    }
    mapPaymentStatusToOrderStatus(paymentStatus) {
        switch (paymentStatus) {
            case 'approved':
                return { paymentOrderStatus: PaymentStatus.PAGO, orderStatus: OrderStatus.PREPARANDO };
            case 'pending':
                return { paymentOrderStatus: PaymentStatus.PENDENTE, orderStatus: OrderStatus.RECEBIDO };
            case 'rejected':
                return { paymentOrderStatus: PaymentStatus.CANCELADO, orderStatus: OrderStatus.FINALIZADO };
            default:
                return 'UNKNOWN';
        }
    }
}
exports.Order = Order;
_Order__id = new WeakMap(), _Order_combo = new WeakMap(), _Order_total = new WeakMap(), _Order_status = new WeakMap(), _Order_paymentStatus = new WeakMap(), _Order_customer = new WeakMap(), _Order_createdAt = new WeakMap(), _Order_updatedAt = new WeakMap();
//# sourceMappingURL=order.js.map