"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const mercadoPagoAxiosInstance = axios_1.default.create({
    baseURL: 'https://api.mercadopago.com',
    headers: {
        'Authorization': `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
});
exports.default = mercadoPagoAxiosInstance;
//# sourceMappingURL=mercado-pago.js.map