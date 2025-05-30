"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = exports.Customer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerSchema = new mongoose_1.default.Schema({
    cpf: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now() },
    updatedAt: { type: Date, required: true, default: Date.now() },
});
exports.CustomerSchema = CustomerSchema;
const Customer = mongoose_1.default.model('Customer', CustomerSchema);
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map