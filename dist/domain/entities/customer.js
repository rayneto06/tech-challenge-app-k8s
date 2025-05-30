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
var _Customer_name, _Customer_email, _Customer_cpf;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor({ name, email, cpf }) {
        _Customer_name.set(this, void 0);
        _Customer_email.set(this, void 0);
        _Customer_cpf.set(this, void 0);
        __classPrivateFieldSet(this, _Customer_name, name, "f");
        __classPrivateFieldSet(this, _Customer_email, email, "f");
        __classPrivateFieldSet(this, _Customer_cpf, cpf, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _Customer_name, "f");
    }
    get email() {
        return __classPrivateFieldGet(this, _Customer_email, "f");
    }
    get cpf() {
        return __classPrivateFieldGet(this, _Customer_cpf, "f");
    }
}
exports.Customer = Customer;
_Customer_name = new WeakMap(), _Customer_email = new WeakMap(), _Customer_cpf = new WeakMap();
//# sourceMappingURL=customer.js.map