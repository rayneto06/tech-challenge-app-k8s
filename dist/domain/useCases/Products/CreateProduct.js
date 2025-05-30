"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(productData) {
        const createdAt = new Date();
        const updatedAt = createdAt;
        const customer = {
            ...productData,
            createdAt,
            updatedAt,
            isEnabled: true
        };
        return this.productRepository.createProduct(customer);
    }
}
exports.default = CreateProduct;
//# sourceMappingURL=CreateProduct.js.map