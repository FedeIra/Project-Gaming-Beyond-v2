import { CreateVideogamesDBInput } from "../../useCases/dataBaseCases/createVideogame.js";
import { CreateVideogameDBPayload } from "./endpoints/getVideogamesDB.js";
import { IVideogame } from "../../models/rawgApi/videogame.js";
import { VideogameModel } from "../../models/dataBase/videogame.js";
import { DatabaseClient } from "../../../pkg/dbClient/databaseClient.js";

export interface DbVideogamesService {
  createVideogameDB(input: CreateVideogamesDBInput): Promise<IVideogame>;
}

export class VideogamesServiceDB implements DbVideogamesService {
  constructor(
    private client: DatabaseClient,
  ) {}

async createVideogameDB(payload: CreateVideogameDBPayload): Promise<IVideogame> {

  const existingVideogame = await this.getUser(payload.name);

  if (existingVideogame) {
    throw new Error("Videogame already exists");
  }

  const newVideogame = await VideogameModel.create(payload);

  return newVideogame;
  }

  async getUser(name: string): Promise<IVideogame | null> {
    return VideogameModel.findOne({ name }).lean<IVideogame>().exec();
  }
}
