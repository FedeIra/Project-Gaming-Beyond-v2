import { MongoClient } from 'mongodb';
import config from '../env/config.js';

export class DatabaseClient {
  client: MongoClient;

  constructor (client: {
    connectionString: string;
  }) {
    this.client = new MongoClient(
      client.connectionString,
    );
  }

  async connect (): Promise<void> {
    try {
      await this.client.connect();
      console.log('Connected to Videogames Database');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async disconnect (): Promise<void> {
    try {
      await this.client.close();
      console.log('Disconnected from Videogames Database');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async getCollection (collectionName: string): Promise<unknown> {
    try {
      const database = this.client.db(`${config.dbName}`);
      return database.collection(collectionName);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
