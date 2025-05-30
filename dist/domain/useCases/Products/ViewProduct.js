"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductDTO_1 = require("./ProductDTO");
class ViewProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        if (!id) {
            throw new Error('Product ID is required');
        }
        if (typeof id !== 'string') {
            throw new Error('Product ID must be a string');
        }
        return this.productRepository.getProductById(id);
    }
    async executeByCategory(category) {
        if (!category) {
            throw new Error('Category is required');
        }
        if (!Object.values(ProductDTO_1.ECategory).includes(category)) {
            throw new Error('Invalid category');
        }
        return this.productRepository.getProductsByCategory(category);
    }
    async getAllProducts() {
        return this.productRepository.getAllProducts();
    }
}
exports.default = ViewProduct;
//# sourceMappingURL=ViewProduct.js.map