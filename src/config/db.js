// src/config/db.js
const AWS = require('aws-sdk');

const region = process.env.AWS_REGION || 'us-east-1';
AWS.config.update({ region });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoDb };
