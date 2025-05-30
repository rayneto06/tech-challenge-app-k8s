"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDERS_TABLE = exports.PRODUCTS_TABLE = exports.CUSTOMERS_TABLE = exports.ddb = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION });
exports.ddb = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
exports.CUSTOMERS_TABLE = process.env.CUSTOMERS_TABLE;
exports.PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;
exports.ORDERS_TABLE = process.env.ORDERS_TABLE;
//# sourceMappingURL=db.js.map