"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongo_1 = require("./config/mongo");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./config/swagger_output.json"));
const customerRoutes_1 = __importDefault(require("./api/customerRoutes"));
const productRoutes_1 = __importDefault(require("./api/productRoutes"));
const orderRoutes_1 = __importDefault(require("./api/orderRoutes"));
const mercadoPagoRoutes_1 = __importDefault(require("./api/mercadoPagoRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
(0, mongo_1.connectDB)();
app.get('/', (_req, res) => {
    res.send('Heartbeat OK 💥');
});
app.use('/api/customers', customerRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/mercadoPago', mercadoPagoRoutes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.listen(port, () => {
    console.log(`Tech Challenge running at http://localhost:${port} 🚀`);
});
//# sourceMappingURL=app.js.map