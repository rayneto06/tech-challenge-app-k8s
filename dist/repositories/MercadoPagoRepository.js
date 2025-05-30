"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mercado_pago_1 = __importDefault(require("../config/mercado-pago"));
class MercadoPagoRepository {
    async createOrder(orderId, externalPaymentOrder) {
        if (!orderId || orderId !== externalPaymentOrder.external_reference) {
            throw new Error('OrderId is required or do not match external reference');
        }
        const mercadoPagoAxiosInstance = (await Promise.resolve().then(() => __importStar(require('../config/mercado-pago')))).default;
        try {
            const response = await mercadoPagoAxiosInstance.post('/instore/orders/qr/seller/collectors/178195313/pos/CAIXAFIAPTECHCHALLENGE/qrs', process.env.NOTIFICATION_URL
                ? { ...externalPaymentOrder, notification_url: process.env.NOTIFICATION_URL }
                : externalPaymentOrder);
            return {
                in_store_order_id: response.data.in_store_order_id,
                qr_data: response.data.qr_data
            };
        }
        catch (error) {
            console.error('Error creating MercadoPago order:', error);
            throw new Error('Failed to create MercadoPago order');
        }
    }
    async assignQRCode(qrCodeDetails) {
        try {
            const response = await mercado_pago_1.default.put('/instore/orders/qr/seller/collectors/178195313/pos/CAIXAFIAPTECHCHALLENGE/qrs', qrCodeDetails);
            return;
        }
        catch (error) {
            console.error('Error assigning MercadoPago order:', error);
            throw new Error('Failed to assign MercadoPago order');
        }
    }
    async getPaymentDetails(orderId) {
        const mercadoPagoAxiosInstance = (await Promise.resolve().then(() => __importStar(require('../config/mercado-pago')))).default;
        try {
            const response = await mercadoPagoAxiosInstance.get(`/instore/qr/seller/collectors/178195313/pos/CAIXAFIAPTECHCHALLENGE/orders?external_reference=${orderId}`);
            if (!response) {
                throw new Error('Payment details not found');
            }
            return response;
        }
        catch (error) {
            console.error('Error fetching payment details:', error);
            throw new Error('Failed to fetch payment details');
        }
    }
}
exports.default = MercadoPagoRepository;
//# sourceMappingURL=MercadoPagoRepository.js.map