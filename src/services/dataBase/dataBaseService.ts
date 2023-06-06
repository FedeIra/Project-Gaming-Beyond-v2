import { z, ZodError } from "zod";
import config from "../../../pkg/env/config.js";
import { IVideogame } from "../../models/dataBase/iVideogame.js";
import { DatabaseClient } from "../../../pkg/dbClient/databaseClient.js";
import { CreateVideogamesDBInput } from "../../useCases/dataBaseCases/createVideogame.js";
import { CreateVideogameDBPayload } from "./endpoints/getVideogamesDB.js";

export interface DbVideogamesService {
  createVideogameDB(input: CreateVideogamesDBInput): Promise<IVideogame>;
}

export class VideogamesServiceDB implements DbVideogamesService {
  private client: DatabaseClient;

  constructor(client: DatabaseClient) {
    this.client = client;
  }

  async createVideogameDB(payload: CreateVideogameDBPayload): Promise<IVideogame> {

    const collection: any = await this.client.getCollection(`${config.videogamesCollection}`);

    await this.checkExistingVideogame(payload.name, collection);

    const newVideogame = await collection.insertOne(payload);

    await this.client.disconnect();

    return newVideogame;
  }

  private async checkExistingVideogame(name: string, collection: any): Promise<void> {
    const existingVideogame = await collection.findOne({ name });

    if (existingVideogame) {
      try {
        const existingVideogameSchema = z.object({}).strict();
        existingVideogameSchema.parse(existingVideogame);
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
  }
}



