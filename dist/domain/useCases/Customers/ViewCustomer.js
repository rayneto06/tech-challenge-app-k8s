"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ViewCustomer {
    //TODO: Manter apenas um caso de uso por classe
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async findCustomerById(id) {
        if (!id) {
            throw new Error('You must provide a valid ID to search for customers');
        }
        let customer = null;
        customer = await this.customerRepository.getCustomerById(id);
        if (!customer) {
            throw new Error('Customer not found.');
        }
        return customer;
    }
    async findCustomerByEmail(email) {
        if (!email) {
            throw new Error('You must provide a valid email to search for customers');
        }
        let customer = null;
        customer = await this.customerRepository.getCustomerByEmail(email);
        if (!customer) {
            throw new Error('Customer not found.');
        }
        return customer;
    }
    async findCustomerByCPF(cpf) {
        if (!cpf) {
            throw new Error('You must provide a valid CPF to search for customers');
        }
        let customer = null;
        customer = await this.customerRepository.getCustomerByCPF(cpf);
        if (!customer) {
            throw new Error('Customer not found.');
        }
        return customer;
    }
}
exports.default = ViewCustomer;
//# sourceMappingURL=ViewCustomer.js.map