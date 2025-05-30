import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";
dotenv.config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
export const ddb = DynamoDBDocumentClient.from(client);

export const CUSTOMERS_TABLE = process.env.CUSTOMERS_TABLE!;
export const PRODUCTS_TABLE  = process.env.PRODUCTS_TABLE!;
export const ORDERS_TABLE    = process.env.ORDERS_TABLE!;
