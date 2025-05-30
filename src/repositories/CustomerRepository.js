import { ddb, CUSTOMERS_TABLE } from "../config/db";
import {
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { Customer } from "../domain/entities/Customer";

export default class CustomerRepository {
  async create(c: Customer): Promise<Customer> {
    await ddb.send(new PutCommand({ TableName: CUSTOMERS_TABLE, Item: c }));
    return c;
  }

  async findAll(): Promise<Customer[]> {
    const { Items } = await ddb.send(new ScanCommand({ TableName: CUSTOMERS_TABLE }));
    return (Items as Customer[]) || [];
  }

  async findById(id: string): Promise<Customer | null> {
    const { Item } = await ddb.send(
      new GetCommand({ TableName: CUSTOMERS_TABLE, Key: { id } })
    );
    return (Item as Customer) || null;
  }

  async update(id: string, attrs: Partial<Customer>): Promise<void> {
    const keys = Object.keys(attrs);
    const UpdateExpression = keys.map((_, i) => `#k${i}= :v${i}`).join(", ");
    const ExpressionAttributeNames = keys.reduce(
      (a, k, i) => ({ ...a, [`#k${i}`]: k }),
      {}
    );
    const ExpressionAttributeValues = keys.reduce(
      (a, k, i) => ({ ...a, [`:v${i}`]: (attrs as any)[k] }),
      {}
    );
    await ddb.send(
      new UpdateCommand({
        TableName: CUSTOMERS_TABLE,
        Key: { id },
        UpdateExpression: `SET ${UpdateExpression}`,
        ExpressionAttributeNames,
        ExpressionAttributeValues
      })
    );
  }

  async delete(id: string): Promise<void> {
    await ddb.send(new DeleteCommand({ TableName: CUSTOMERS_TABLE, Key: { id } }));
  }
}
