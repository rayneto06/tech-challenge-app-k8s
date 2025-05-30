"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeleteProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        if (!id) {
            throw new Error('Product ID is required');
        }
        return this.productRepository.deleteProduct(id);
    }
}
exports.default = DeleteProduct;
//# sourceMappingURL=DeleteProduct.js.map