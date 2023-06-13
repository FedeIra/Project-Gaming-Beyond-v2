import { IVideogame } from '../../models/dataBase/iVideogame.js';
import { DbVideogamesService } from '../../services/dataBase/dataBaseService.js';

export type UpdateVideogameDBInput = Partial<IVideogame> & { id: string };

export type UpdateVideogameDBOutput = {
  message: string;
};

export class UpdateVideogameDBUseCase {
  constructor(private videogamesServiceDB: DbVideogamesService) {}

  async updateVideogameDB(
    input: UpdateVideogameDBInput
  ): Promise<UpdateVideogameDBOutput> {
    return this.videogamesServiceDB.updateVideogameDB(input);
  }
}
