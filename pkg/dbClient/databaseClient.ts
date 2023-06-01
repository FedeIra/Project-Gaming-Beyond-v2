// build a client for mongo db database:

import { MongoClient } from 'mongodb';

export class DatabaseClient {
  private client: MongoClient;

  constructor (client: {
    connectionString: string;
  }) {
    this.client = new MongoClient(client.connectionString);
  }

  async connect (): Promise<void> {
    await this.client.connect();
  }

  async disconnect (): Promise<void> {
    await this.client.close();
  }

  async getCollection (collectionName: string): Promise<unknown> {
    const database = this.client.db('rawg');
    return database.collection(collectionName);
  }
}
