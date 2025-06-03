// src/repositories/OrderRepository.js
const { dynamoDb } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class OrderRepository {
  constructor() {
    this.tableName = process.env.ORDERS_TABLE;
  }

  async createOrder({ customerId, combo, total }) {
    const id = uuidv4();
    const now = new Date().toISOString();
    const item = {
      id,
      customerId,
      combo,
      total,
      status: 'Recebido',
      paymentStatus: 'Pendente',
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

  async getAllOrders() {
    const params = { TableName: this.tableName };
    const result = await dynamoDb.scan(params).promise();
    return result.Items || [];
  }

  async getAllActiveOrders() {
    // Filter out status == 'Finalizado'
    const params = {
      TableName: this.tableName,
      FilterExpression: 'status <> :finalizado',
      ExpressionAttributeValues: {
        ':finalizado': 'Finalizado'
      }
    };
    const result = await dynamoDb.scan(params).promise();
    return result.Items || [];
  }

  async getOrderById(id) {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item || null;
  }

  async getOrderStatusById(id) {
    const order = await this.getOrderById(id);
    if (!order) return null;
    return { id: order.id, status: order.status, paymentStatus: order.paymentStatus };
  }

  async updateOrderStatus(id, newStatus) {
    const now = new Date().toISOString();
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'SET #s = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: {
        ':status': newStatus,
        ':updatedAt': now
      },
      ReturnValues: 'ALL_NEW'
    };
    const result = await dynamoDb.update(params).promise();
    return result.Attributes || null;
  }

  async updatePaymentStatus(id, paymentStatus) {
    const now = new Date().toISOString();
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'SET paymentStatus = :paymentStatus, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':paymentStatus': paymentStatus,
        ':updatedAt': now
      },
      ReturnValues: 'ALL_NEW'
    };
    const result = await dynamoDb.update(params).promise();
    return result.Attributes || null;
  }
}

module.exports = OrderRepository;
