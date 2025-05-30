"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class OrderRepository {
    async create(o) {
        await db_1.ddb.send(new lib_dynamodb_1.PutCommand({ TableName: db_1.ORDERS_TABLE, Item: o }));
        return o;
    }
    async findAll() {
        const { Items } = await db_1.ddb.send(new lib_dynamodb_1.ScanCommand({ TableName: db_1.ORDERS_TABLE }));
        return Items || [];
    }
    async findById(id) {
        const { Item } = await db_1.ddb.send(new lib_dynamodb_1.GetCommand({ TableName: db_1.ORDERS_TABLE, Key: { id } }));
        return Item || null;
    }
    async update(id, attrs) {
        const keys = Object.keys(attrs);
        const upd = keys.map((_, i) => `#k${i}= :v${i}`).join(", ");
        const names = keys.reduce((a, k, i) => ({ ...a, [`#k${i}`]: k }), {});
        const vals = keys.reduce((a, k, i) => ({ ...a, [`:v${i}`]: attrs[k] }), {});
        await db_1.ddb.send(new lib_dynamodb_1.UpdateCommand({
            TableName: db_1.ORDERS_TABLE,
            Key: { id },
            UpdateExpression: `SET ${upd}`,
            ExpressionAttributeNames: names,
            ExpressionAttributeValues: vals
        }));
    }
    async delete(id) {
        await db_1.ddb.send(new lib_dynamodb_1.DeleteCommand({ TableName: db_1.ORDERS_TABLE, Key: { id } }));
    }
}
exports.default = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map