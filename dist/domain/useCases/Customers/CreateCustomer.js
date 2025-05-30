"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../../entities/customer");
class CreateCustomer {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async execute(customerData) {
        const createdAt = new Date();
        const updatedAt = createdAt;
        const customer = {
            ...customerData,
            createdAt,
            updatedAt,
        };
        const newCustomer = await this.customerRepository.createCustomer(customer);
        return new customer_1.Customer(newCustomer);
    }
}
exports.default = CreateCustomer;
//# sourceMappingURL=CreateCustomer.js.map