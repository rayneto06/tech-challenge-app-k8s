"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const CreateCustomer_1 = __importDefault(require("../../domain/useCases/Customers/CreateCustomer"));
const ViewCustomer_1 = __importDefault(require("../../domain/useCases/Customers/ViewCustomer"));
const customerCreated_dto_1 = require("./dtos/output/customerCreated.dto");
const FindCustomerByCPF_dto_1 = require("./dtos/output/FindCustomerByCPF.dto");
const FindCustomerById_dto_1 = require("./dtos/output/FindCustomerById.dto");
const FindCustomerByEmail_dto_1 = require("./dtos/output/FindCustomerByEmail.dto");
class CustomerController {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
        this.createCustomerUseCase = new CreateCustomer_1.default(customerRepository);
        this.viewCustomerUseCases = new ViewCustomer_1.default(customerRepository);
    }
    async createCustomer({ cpf, email, name }) {
        const customer = await this.createCustomerUseCase.execute({ cpf, email, name });
        return new customerCreated_dto_1.CustomerCreatedOutput(customer);
    }
    async findCustomerById({ id }) {
        const customer = await this.viewCustomerUseCases.findCustomerById(id);
        return new FindCustomerById_dto_1.FindCustomerByIdOutput(customer);
    }
    async findCustomerByCPF({ cpf }) {
        const customer = await this.viewCustomerUseCases.findCustomerByCPF(cpf);
        return new FindCustomerByCPF_dto_1.FindCustomerByCPFOutput(customer);
    }
    async findCustomerByEmail({ email }) {
        const customer = await this.viewCustomerUseCases.findCustomerByEmail(email);
        return new FindCustomerByEmail_dto_1.FindCustomerByEmailOutput(customer);
    }
    async listAllCustomers() {
        return this.customerRepository.getAllCustomers();
    }
    async updateCustomer({ id, customerData }) {
        const updatedCustomer = await this.customerRepository.updateCustomer(id, customerData);
        return new customerCreated_dto_1.CustomerCreatedOutput(updatedCustomer);
    }
    async deleteCustomer({ id }) {
        await this.customerRepository.deleteCustomer(id);
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map