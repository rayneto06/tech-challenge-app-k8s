"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductRepository_1 = __importDefault(require("../repositories/ProductRepository"));
const CreateProduct_1 = __importDefault(require("../domain/useCases/Products/CreateProduct"));
const ViewProduct_1 = __importDefault(require("../domain/useCases/Products/ViewProduct"));
const EditProduct_1 = __importDefault(require("../domain/useCases/Products/EditProduct"));
const DeleteProduct_1 = __importDefault(require("../domain/useCases/Products/DeleteProduct"));
const router = express_1.default.Router();
const productRepository = new ProductRepository_1.default();
const createProduct = new CreateProduct_1.default(productRepository);
const viewProduct = new ViewProduct_1.default(productRepository);
const editProduct = new EditProduct_1.default(productRepository);
const deleteProduct = new DeleteProduct_1.default(productRepository);
// GET /api/products - List all products
router.get('/', async (req, res) => {
    try {
        const products = await viewProduct.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// GET /api/products/category/:category - List products by category
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const products = await viewProduct.executeByCategory(category);
        res.json(products);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await viewProduct.execute(id);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// POST /api/products - Create a new product
router.post('/', async (req, res) => {
    try {
        const productData = req.body;
        const product = await createProduct.execute(productData);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// PUT /api/products/:id - Update a product
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;
        const product = await editProduct.execute(id, productData);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// DELETE /api/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await deleteProduct.execute(id);
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=productRoutes.js.map