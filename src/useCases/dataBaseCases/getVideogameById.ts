import { IVideogame } from '../../models/dataBase/iVideogame.js';
import { DbVideogamesService } from '../../services/dataBase/dataBaseService.js';

export type GetVideogameByIdInput = {
  videogameId: string;
};

export type VideogameByIdDBOutput = IVideogame;

export class VideogameByIdDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async getVideogameByIdDB(
    input: GetVideogameByIdInput
  ): Promise<VideogameByIdDBOutput> {
    return this.videogamesServiceDB.getVideogameByIdDB(input);
  }
}
