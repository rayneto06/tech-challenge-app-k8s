import { ddb, ORDERS_TABLE } from "../config/db";
import {
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { Order } from "../domain/entities/Order";

export default class OrderRepository {
  async create(o: Order): Promise<Order> {
    await ddb.send(new PutCommand({ TableName: ORDERS_TABLE, Item: o }));
    return o;
  }

  async findAll(): Promise<Order[]> {
    const { Items } = await ddb.send(new ScanCommand({ TableName: ORDERS_TABLE }));
    return (Items as Order[]) || [];
  }

  async findById(id: string): Promise<Order | null> {
    const { Item } = await ddb.send(
      new GetCommand({ TableName: ORDERS_TABLE, Key: { id } })
    );
    return (Item as Order) || null;
  }

  async update(id: string, attrs: Partial<Order>): Promise<void> {
    const keys = Object.keys(attrs);
    const upd = keys.map((_, i) => `#k${i}= :v${i}`).join(", ");
    const names = keys.reduce((a, k, i) => ({ ...a, [`#k${i}`]: k }), {});
    const vals  = keys.reduce((a, k, i) => ({ ...a, [`:v${i}`]: (attrs as any)[k] }), {});
    await ddb.send(
      new UpdateCommand({
        TableName: ORDERS_TABLE,
        Key: { id },
        UpdateExpression: `SET ${upd}`,
        ExpressionAttributeNames: names,
        ExpressionAttributeValues: vals
      })
    );
  }

  async delete(id: string): Promise<void> {
    await ddb.send(new DeleteCommand({ TableName: ORDERS_TABLE, Key: { id } }));
  }
}
