import { MongoClient } from 'mongodb';

export class DatabaseClient {
  private client: MongoClient;

  constructor (client: {
    connectionString: string;
  }) {
    this.client = new MongoClient(
      client.connectionString,
    );
  }

  async connect (): Promise<void> {
    await this.client.connect();
    console.log('Connected to Videogames MongoDB database');
  }

  async disconnect (): Promise<void> {
    await this.client.close();
  }

  async getCollection (collectionName: string): Promise<unknown> {
    const database = this.client.db('videogames');
    return database.collection(collectionName);
  }
}
