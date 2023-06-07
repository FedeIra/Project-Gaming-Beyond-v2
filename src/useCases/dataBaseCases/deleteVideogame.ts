import { DbVideogamesService } from "../../services/dataBase/dataBaseService.js";

export type DeleteVideogameDBInput = {
  videogameId: string;
};

export type DeleteVideogameDBOutput = {
  message: string;
};

export class DeleteVideogameDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async deleteVideogameDB(input: DeleteVideogameDBInput): Promise<DeleteVideogameDBOutput> {
    return this.videogamesServiceDB.deleteVideogameDB(input);
  }
}
