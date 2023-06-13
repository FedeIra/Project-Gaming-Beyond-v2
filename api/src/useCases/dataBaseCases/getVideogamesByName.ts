import { IVideogame } from '../../models/dataBase/iVideogame.js';
import { DbVideogamesService } from '../../services/dataBase/dataBaseService.js';

export type GetVideogamesByNameInput = {
  name: string;
};

export type VideogamesByNameDBOutput = IVideogame[];

export class VideogamesByNameDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async getVideogamesByNameDB(
    input: GetVideogamesByNameInput
  ): Promise<VideogamesByNameDBOutput> {
    return this.videogamesServiceDB.getVideogamesByNameDB(input);
  }
}
