import { IVideogame } from "../../models/rawgApi/videogame.js";
import { DbVideogamesService } from "../../services/dataBase/dataBaseService.js";

export type CreateVideogamesDBInput = Pick<IVideogame, "name" | "image" | "genres" | "rating" | "platforms" | "releaseDate">;

export type CreateVideogamesDBOutput = IVideogame;

export class CreateVideogamesDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async createVideogameDB(input: CreateVideogamesDBInput): Promise<CreateVideogamesDBOutput> {
    return this.videogamesServiceDB.createVideogameDB(input);
  }
}
