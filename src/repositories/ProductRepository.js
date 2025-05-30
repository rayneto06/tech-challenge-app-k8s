import { ddb, PRODUCTS_TABLE } from "../config/db";
import {
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { Product } from "../domain/entities/Product";

export default class ProductRepository {
  async create(p: Product): Promise<Product> {
    await ddb.send(new PutCommand({ TableName: PRODUCTS_TABLE, Item: p }));
    return p;
  }

  async findAll(): Promise<Product[]> {
    const { Items } = await ddb.send(new ScanCommand({ TableName: PRODUCTS_TABLE }));
    return (Items as Product[]) || [];
  }

  async findById(id: string): Promise<Product | null> {
    const { Item } = await ddb.send(
      new GetCommand({ TableName: PRODUCTS_TABLE, Key: { id } })
    );
    return (Item as Product) || null;
  }

  async update(id: string, attrs: Partial<Product>): Promise<void> {
    const keys = Object.keys(attrs);
    const upd = keys.map((_, i) => `#k${i}= :v${i}`).join(", ");
    const names = keys.reduce((a, k, i) => ({ ...a, [`#k${i}`]: k }), {});
    const vals  = keys.reduce((a, k, i) => ({ ...a, [`:v${i}`]: (attrs as any)[k] }), {});
    await ddb.send(
      new UpdateCommand({
        TableName: PRODUCTS_TABLE,
        Key: { id },
        UpdateExpression: `SET ${upd}`,
        ExpressionAttributeNames: names,
        ExpressionAttributeValues: vals
      })
    );
  }

  async delete(id: string): Promise<void> {
    await ddb.send(new DeleteCommand({ TableName: PRODUCTS_TABLE, Key: { id } }));
  }
}
