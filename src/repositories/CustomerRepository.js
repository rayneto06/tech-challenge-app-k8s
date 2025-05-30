// src/repositories/CustomerRepository.js
import { dynamoDb, TABLE_CUSTOMERS } from "../config/db.js";
import { v4 as uuid } from "uuid";

export default class CustomerRepository {
  async create({ cpf, name, email }) {
    const item = { id: uuid(), cpf, name, email, createdAt: Date.now() };
    await dynamoDb.put({ TableName: TABLE_CUSTOMERS, Item: item }).promise();
    return item;
  }

  async getAll() {
    const { Items } = await dynamoDb.scan({ TableName: TABLE_CUSTOMERS }).promise();
    return Items;
  }

  async getById(id) {
    const { Item } = await dynamoDb
      .get({ TableName: TABLE_CUSTOMERS, Key: { id } })
      .promise();
    return Item;
  }

  async getByCPF(cpf) {
    const { Items } = await dynamoDb.query({
      TableName: TABLE_CUSTOMERS,
      IndexName: "cpf-index",
      KeyConditionExpression: "cpf = :cpf",
      ExpressionAttributeValues: { ":cpf": cpf },
    }).promise();
    return Items[0];
  }

  async getByEmail(email) {
    const { Items } = await dynamoDb.query({
      TableName: TABLE_CUSTOMERS,
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: { ":email": email },
    }).promise();
    return Items[0];
  }

  async update(id, attrs) {
    const names  = Object.keys(attrs).reduce((acc,k)=>({...acc, [`#${k}`]: k}), {});
    const values = Object.entries(attrs).reduce((acc,[k,v])=>({...acc, [`:${k}`]: v}), {});
    const setExp = Object.keys(attrs).map(k=>`#${k}= :${k}`).join(", ");

    const { Attributes } = await dynamoDb.update({
      TableName: TABLE_CUSTOMERS,
      Key: { id },
      UpdateExpression: `SET ${setExp}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ReturnValues: "ALL_NEW"
    }).promise();

    return Attributes;
  }

  async delete(id) {
    await dynamoDb.delete({ TableName: TABLE_CUSTOMERS, Key: { id } }).promise();
  }
}
