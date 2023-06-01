import { CreateVideogamesDBInput } from "../../useCases/dataBaseCases/createVideogame.js";
import { IVideogame } from "../../models/rawgApi/videogame.js";
import { VideogameModel } from "../../models/dataBase/videogame.js";

export interface DbVideogamesService {
  createVideogameDB(input: CreateVideogamesDBInput): Promise<IVideogame>;
}

export class VideogamesService implements DbVideogamesService {
  constructor() {}

  async createVideogameDB(data: IVideogame): Promise<IVideogame> {

    const existingVideogame = await this.getUser(data.name);

    if (existingVideogame) {
      throw new Error("Videogame already exists");
    }

    const newVideogame = await VideogameModel.create(data);

    return newVideogame;
  }

  async getUser(name: string): Promise<IVideogame | null> {
    return VideogameModel.findOne({ name }).lean<IVideogame>().exec();
  }
}

