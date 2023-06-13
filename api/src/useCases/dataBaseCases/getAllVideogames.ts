import { IVideogame } from '../../models/dataBase/iVideogame.js';
import { DbVideogamesService } from '../../services/dataBase/dataBaseService.js';

export type GetAllVideogamesDBOutput = IVideogame[];

export class GetAllVideogamesDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async getAllVideogamesDB(): Promise<GetAllVideogamesDBOutput> {
    return this.videogamesServiceDB.getAllVideogamesDB();
  }
}
