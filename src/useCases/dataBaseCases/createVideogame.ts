import { IVideogame } from "../../models/rawgApi/videogame.js";
import { DbVideogamesService } from "../../services/dataBase/dataBaseService.js";

export type CreateVideogamesDBInput = IVideogame;
export type CreateVideogamesDBOutput = IVideogame;

export class CreateVideogamesDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async createVideogameDB(input: CreateVideogamesDBInput): Promise<CreateVideogamesDBOutput> {
    return this.videogamesServiceDB.createVideogameDB(input);
  }
}
