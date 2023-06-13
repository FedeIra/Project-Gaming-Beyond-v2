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

import {
  GetVideogamesByNameInput,
  VideogamesByNameDBOutput,
} from '../../useCases/dataBaseCases/getVideogamesByName.js';
import { GetVideogamesByNameDBPayload } from './endpoints/getVideogamesByName.js';

import {
  GetVideogameByIdInput,
  VideogameByIdDBOutput,
} from '../../useCases/dataBaseCases/getVideogameById.js';
import { GetVideogameByIdDBPayload } from './endpoints/getVideogameById.js';

import {
  UpdateVideogameDBInput,
  UpdateVideogameDBOutput,
} from '../../useCases/dataBaseCases/updateVideogame.js';
import { UpdateVideogameDBPayload } from './endpoints/updateVideogameDB.js';

export interface DbVideogamesService {
  createVideogameDB(input: CreateVideogamesDBInput): Promise<string>;
  deleteVideogameDB(
    input: DeleteVideogameDBInput
  ): Promise<DeleteVideogameDBOutput>;
  getAllVideogamesDB(): Promise<GetAllVideogamesDBOutput>;
  getVideogamesByNameDB(
    input: GetVideogamesByNameInput
  ): Promise<VideogamesByNameDBOutput>;
  getVideogameByIdDB(
    input: GetVideogameByIdInput
  ): Promise<VideogameByIdDBOutput>;
  updateVideogameDB(
    input: UpdateVideogameDBInput
  ): Promise<UpdateVideogameDBOutput>;
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

    await this.client.disconnect();

    return videogamesDB.map((videogame: any) => toModelVideogameDB(videogame));
  }

  async getVideogamesByNameDB(
    input: GetVideogamesByNameDBPayload
  ): Promise<VideogamesByNameDBOutput> {
    const collection: any = await this.client.getCollection(
      `${config.videogamesCollection}`
    );

    const videogamesDB = await collection
      .find({ name: { $regex: input.name, $options: 'i' } })
      .toArray();

    await this.client.disconnect();

    return videogamesDB.map((videogame: any) =>
      getVideogameDbSchema.parse(toModelVideogameDB(videogame))
    );
  }

  async getVideogameByIdDB(
    input: GetVideogameByIdDBPayload
  ): Promise<VideogameByIdDBOutput> {
    const collection: any = await this.client.getCollection(
      `${config.videogamesCollection}`
    );

    try {
      const queryId = { _id: new ObjectId(input.videogameId) };

      const videogame = await collection.findOne(queryId);

      await this.client.disconnect();

      const videogameDetail = getVideogameDbSchema.parse(
        toModelVideogameDB(videogame)
      );

      return videogameDetail;
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

  async updateVideogameDB(
    input: UpdateVideogameDBPayload
  ): Promise<UpdateVideogameDBOutput> {
    const collection: any = await this.client.getCollection(
      `${config.videogamesCollection}`
    );

    const existingVideogameId = await this.checkVideogameExists(
      input.id,
      collection
    );

    await collection.updateOne(existingVideogameId, {
      $set: {
        name: input.name,
        image: input.image,
        genres: input.genres,
        rating: input.rating,
        platforms: input.platforms,
        description: input.description,
        releaseDate: input.releaseDate,
      },
    });
    await this.client.disconnect();

    return {
      message: 'Videogame updated successfully.',
    };
  }
}
