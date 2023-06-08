import { ObjectId } from 'mongodb';
import { ZodError } from 'zod';

import config from '../../../pkg/env/config.js';
import { DatabaseClient } from '../../../pkg/dbClient/databaseClient.js';

import { getVideogameDbSchema } from './endpoints/getVideogameDB.js';
import { toModelVideogameDB } from './entities/videogame.js';

import { CreateVideogamesDBInput } from '../../useCases/dataBaseCases/createVideogame.js';
import { CreateVideogameDBPayload } from './endpoints/createVideogamesDB.js';

import {
  DeleteVideogameDBInput,
  DeleteVideogameDBOutput,
} from '../../useCases/dataBaseCases/deleteVideogame.js';
import { DeleteVideogameDBPayload } from './endpoints/deleteVideogames.js';

import { GetAllVideogamesDBOutput } from '../../useCases/dataBaseCases/getAllVideogames.js';

export interface DbVideogamesService {
  createVideogameDB(input: CreateVideogamesDBInput): Promise<string>;
  deleteVideogameDB(
    input: DeleteVideogameDBInput
  ): Promise<DeleteVideogameDBOutput>;
  getAllVideogamesDB(): Promise<GetAllVideogamesDBOutput>;
}

export class VideogamesServiceDB implements DbVideogamesService {
  private client: DatabaseClient;

  constructor(client: DatabaseClient) {
    this.client = client;
  }

  private async checkNameNotRepeated(
    name: string,
    collection: any
  ): Promise<void> {
    const existingVideogame = await collection.findOne({ name });

    if (existingVideogame !== null) {
      throw new ZodError([
        {
          path: ['name'],
          message: 'Videogame name already exists.',
          code: 'custom',
        },
      ]);
    }
  }

  private async checkVideogameExists(
    id: string,
    collection: any
  ): Promise<{ _id: ObjectId }> {
    try {
      const queryId = { _id: new ObjectId(id) };

      const existingVideogame = await collection.findOne(queryId);

      getVideogameDbSchema.parse(toModelVideogameDB(existingVideogame));

      return queryId;
    } catch (error) {
      await this.client.disconnect();
      throw new ZodError([
        {
          path: ['id'],
          message: 'Videogame not found.',
          code: 'custom',
        },
      ]);
    }
  }

  async getAllVideogamesDB(): Promise<GetAllVideogamesDBOutput> {
    const collection: any = await this.client.getCollection(
      `${config.videogamesCollection}`
    );

    const videogamesDB = await collection.find().toArray();

    console.log(videogamesDB);

    await this.client.disconnect();

    return videogamesDB.map((videogame: any) => toModelVideogameDB(videogame));
  }

  async createVideogameDB(payload: CreateVideogameDBPayload): Promise<string> {
    const collection: any = await this.client.getCollection(
      `${config.videogamesCollection}`
    );

    await this.checkNameNotRepeated(payload.name, collection);

    const newVideogame = await collection.insertOne(payload);

    await this.client.disconnect();

    return newVideogame.insertedId.toString();
  }

  async deleteVideogameDB(
    input: DeleteVideogameDBPayload
  ): Promise<DeleteVideogameDBOutput> {
    const collection: any = await this.client.getCollection(
      `${config.videogamesCollection}`
    );

    const existingVideogameId = await this.checkVideogameExists(
      input.videogameId,
      collection
    );

    await collection.deleteOne(existingVideogameId);

    await this.client.disconnect();

    return {
      message: 'Videogame deleted successfully.',
    };
  }
}
