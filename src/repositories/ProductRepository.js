// src/repositories/ProductRepository.js
const { dynamoDb } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class ProductRepository {
  constructor() {
    this.tableName = process.env.PRODUCTS_TABLE;
  }

  async createProduct({ name, category, description, price, imageUrl }) {
    const id = uuidv4();
    const now = new Date().toISOString();

    const item = { 
      id,
      name,
      category,
      description,
      price,
      imageUrl,
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

  async getAllProducts() {
    const params = {
      TableName: this.tableName
    };
    const result = await dynamoDb.scan(params).promise();
    return result.Items || [];
  }

  async getProductById(id) {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item || null;
  }

  async getProductsByCategory(category) {
    // Scan with filter on category
    const params = {
      TableName: this.tableName,
      FilterExpression: 'category = :category',
      ExpressionAttributeValues: {
        ':category': category
      }
    };
    const result = await dynamoDb.scan(params).promise();
    return result.Items || [];
  }

  async updateProduct(id, { name, category, description, price, imageUrl }) {
    const now = new Date().toISOString();
    const expressionParts = [];
    const attributeValues = { ':updatedAt': now };

    if (name !== undefined) {
      expressionParts.push('name = :name');
      attributeValues[':name'] = name;
    }
    if (category !== undefined) {
      expressionParts.push('category = :category');
      attributeValues[':category'] = category;
    }
    if (description !== undefined) {
      expressionParts.push('description = :description');
      attributeValues[':description'] = description;
    }
    if (price !== undefined) {
      expressionParts.push('price = :price');
      attributeValues[':price'] = price;
    }
    if (imageUrl !== undefined) {
      expressionParts.push('imageUrl = :imageUrl');
      attributeValues[':imageUrl'] = imageUrl;
    }

    expressionParts.push('updatedAt = :updatedAt');
    const updateExpression = 'SET ' + expressionParts.join(', ');

    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: attributeValues,
      ReturnValues: 'ALL_NEW'
    };

    const result = await dynamoDb.update(params).promise();
    return result.Attributes || null;
  }

  async deleteProduct(id) {
    const params = {
      TableName: this.tableName,
      Key: { id }
    };
    await dynamoDb.delete(params).promise();
    return { id };
  }
}

module.exports = ProductRepository;
