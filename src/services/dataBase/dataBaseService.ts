import { ObjectId } from "mongodb";
import { z, ZodError } from "zod";
import config from "../../../pkg/env/config.js";
import { DatabaseClient } from "../../../pkg/dbClient/databaseClient.js";

import { CreateVideogamesDBInput } from "../../useCases/dataBaseCases/createVideogame.js";
import { CreateVideogameDBPayload } from "./endpoints/createVideogamesDB.js";

import { DeleteVideogameDBInput, DeleteVideogameDBOutput} from "../../useCases/dataBaseCases/deleteVideogame.js";
import { DeleteVideogameDBPayload } from "./endpoints/deleteVideogames.js";

export interface DbVideogamesService {
  createVideogameDB(input: CreateVideogamesDBInput): Promise<string>;
  deleteVideogameDB(input: DeleteVideogameDBInput): Promise<DeleteVideogameDBOutput>;
}

export class VideogamesServiceDB implements DbVideogamesService {
  private client: DatabaseClient;

  constructor(client: DatabaseClient) {
    this.client = client;
  }

  private async getVideogameByName(name: string, collection: any): Promise<void> {
    try {
      const existingVideogame = await collection.findOne({ name });
      if (existingVideogame) {
        const existingVideogameSchema = z.object({}).strict();
        existingVideogameSchema.parse(existingVideogame);
      }
    } catch (error) {
        await this.client.disconnect();
        throw new ZodError([

          {
            path: ["name"],
            message: "Videogame name already exists.",
            code: "custom",
          },
        ]);
      }
    }


  private async getVideogameById(id: string, collection: any): Promise<{ _id: ObjectId }> {
    try {
      const queryId = { _id: new ObjectId(id) };

      await collection.findOne(queryId);

      return queryId;
    } catch (error) {
      await this.client.disconnect();
      throw new ZodError([
        {
          path: ["id"],
          message: "Videogame not found.",
          code: "custom",
        },
      ]);
    }
  }

  async createVideogameDB(payload: CreateVideogameDBPayload): Promise<string> {

    const collection: any = await this.client.getCollection(`${config.videogamesCollection}`);

    await this.getVideogameByName(payload.name, collection);

    const newVideogame = await collection.insertOne(payload);

    await this.client.disconnect();

    return newVideogame.insertedId.toString();
  }

  async deleteVideogameDB(input: DeleteVideogameDBPayload): Promise<DeleteVideogameDBOutput> {
    const collection: any = await this.client.getCollection(`${config.videogamesCollection}`);

    const existingVideogameId = await this.getVideogameById(input.videogameId, collection);

    await collection.deleteOne(existingVideogameId);

    await this.client.disconnect();

    return {
      message: "Videogame deleted successfully.",
    }
  }
}



