// src/repositories/CustomerRepository.js
const { dynamoDb } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class CustomerRepository {
  constructor() {
    this.tableName = process.env.CUSTOMERS_TABLE;
  }

  async createCustomer({ name, email, cpf }) {
    const id = uuidv4();
    const now = new Date().toISOString();

    const item = {
      id,
      name,
      email,
      cpf,
      createdAt: now,
      updatedAt: now
    };

    const params = {
      TableName: this.tableName,
      Item: item
    };

    await dynamoDb.put(params).promise();
    return item;
  }

  async getCustomerById(id) {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item || null;
  }

  async getCustomerByEmail(email) {
    // Perform a Scan with a filter on email
    const params = {
      TableName: this.tableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      },
      Limit: 1
    };

    const result = await dynamoDb.scan(params).promise();
    return (result.Items && result.Items.length > 0) ? result.Items[0] : null;
  }

  async getCustomerByCPF(cpf) {
    // Perform a Scan with a filter on cpf
    const params = {
      TableName: this.tableName,
      FilterExpression: 'cpf = :cpf',
      ExpressionAttributeValues: {
        ':cpf': cpf
      },
      Limit: 1
    };

    const result = await dynamoDb.scan(params).promise();
    return (result.Items && result.Items.length > 0) ? result.Items[0] : null;
  }
}

module.exports = CustomerRepository;
