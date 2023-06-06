import { z, ZodError } from "zod";
import config from "../../../pkg/env/config.js";
import { DatabaseClient } from "../../../pkg/dbClient/databaseClient.js";
import { CreateVideogamesDBInput } from "../../useCases/dataBaseCases/createVideogame.js";
import { CreateVideogameDBPayload } from "./endpoints/getVideogamesDB.js";
import { DeleteVideogameDBInput, DeleteVideogameDBOutput} from "../../useCases/dataBaseCases/deleteVideogame.js";

export interface DbVideogamesService {
  createVideogameDB(input: CreateVideogamesDBInput): Promise<string>;
  deleteVideogameDB(input: DeleteVideogameDBInput): Promise<DeleteVideogameDBOutput>;
}

export class VideogamesServiceDB implements DbVideogamesService {
  private client: DatabaseClient;

  constructor(client: DatabaseClient) {
    this.client = client;
  }

  async createVideogameDB(payload: CreateVideogameDBPayload): Promise<string> {

    const collection: any = await this.client.getCollection(`${config.videogamesCollection}`);

    await this.checkExistingVideogame(payload.name, collection);

    const newVideogame = await collection.insertOne(payload);

    await this.client.disconnect();

    return newVideogame.insertedId.toString();
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

  async deleteVideogameDB(input: DeleteVideogameDBInput): Promise<DeleteVideogameDBOutput> {
    const collection: any = await this.client.getCollection(`${config.videogamesCollection}`);

    console.log(input.videogameId);

    await collection.deleteOne({ _id: input.videogameId });

    await this.client.disconnect();

    return {
      message: "Videogame deleted successfully.",
    }
  }
}



