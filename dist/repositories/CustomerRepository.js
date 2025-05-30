"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class CustomerRepository {
    async create(c) {
        await db_1.ddb.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.CUSTOMERS_TABLE, Item: c }));
        return c;
    }
    async findAll() {
        const { Items } = await db_1.ddb.send(new lib_dynamodb_1.ScanCommand({ TableName: db_1.CUSTOMERS_TABLE }));
        return Items || [];
    }
    async findById(id) {
        const { Item } = await db_1.ddb.send(new lib_dynamodb_1.GetCommand({ TableName: db_1.CUSTOMERS_TABLE, Key: { id } }));
        return Item || null;
    }
    async update(id, attrs) {
        const keys = Object.keys(attrs);
        const UpdateExpression = keys.map((_, i) => `#k${i}= :v${i}`).join(", ");
        const ExpressionAttributeNames = keys.reduce((a, k, i) => ({ ...a, [`#k${i}`]: k }), {});
        const ExpressionAttributeValues = keys.reduce((a, k, i) => ({ ...a, [`:v${i}`]: attrs[k] }), {});
        await db_1.ddb.send(new lib_dynamodb_1.UpdateCommand({
            TableName: db_1.CUSTOMERS_TABLE,
            Key: { id },
            UpdateExpression: `SET ${UpdateExpression}`,
            ExpressionAttributeNames,
            ExpressionAttributeValues
        }));
    }
    async delete(id) {
        await db_1.ddb.send(new lib_dynamodb_1.DeleteCommand({ TableName: db_1.CUSTOMERS_TABLE, Key: { id } }));
    }
}
exports.default = CustomerRepository;
//# sourceMappingURL=CustomerRepository.js.map