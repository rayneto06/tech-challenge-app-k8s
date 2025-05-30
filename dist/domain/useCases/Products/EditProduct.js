"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductDTO_1 = require("./ProductDTO");
class EditProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id, productData) {
        if (!id) {
            throw new Error('Product ID is required');
        }
        if (typeof id !== 'string') {
            throw new Error('Product ID must be a string');
        }
        if (!productData) {
            throw new Error('Product data is required');
        }
        if (typeof productData !== 'object') {
            throw new Error('Product data must be an object');
        }
        if (productData.category && !Object.values(ProductDTO_1.ECategory).includes(productData.category)) {
            throw new Error('Invalid category');
        }
        return this.productRepository.updateProduct(id, { ...productData, updatedAt: new Date() });
    }
}
exports.default = EditProduct;
//# sourceMappingURL=EditProduct.js.map