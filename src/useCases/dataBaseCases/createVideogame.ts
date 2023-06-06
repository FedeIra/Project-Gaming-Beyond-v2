import { IVideogame } from "../../models/dataBase/iVideogame.js";
import { DbVideogamesService } from "../../services/dataBase/dataBaseService.js";

export type CreateVideogamesDBInput = Pick<IVideogame, "name" | "image" | "genres" | "rating" | "platforms" | "description" | "releaseDate">;

export type CreateVideogamesDBOutput = IVideogame;

export class CreateVideogamesDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async createVideogameDB(input: CreateVideogamesDBInput): Promise<CreateVideogamesDBOutput> {
    return this.videogamesServiceDB.createVideogameDB(input);
  }
}
