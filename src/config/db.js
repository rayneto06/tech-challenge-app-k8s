// src/config/db.js
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

// configure AWS SDK from your .env
AWS.config.update({
  region: process.env.AWS_REGION || "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const TABLE_CUSTOMERS = process.env.CUSTOMERS_TABLE || "Customers";
export const TABLE_PRODUCTS  = process.env.PRODUCTS_TABLE  || "Products";
export const TABLE_ORDERS    = process.env.ORDERS_TABLE    || "Orders";
