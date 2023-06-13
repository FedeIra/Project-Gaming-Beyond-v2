import { GenreName } from '../../models/rawgApi/genres.js';
import { VideogamesService } from '../../services/rawgVideogames/videogamesService.js';

export type GetPlatformsOutput = GenreName;

export class GetGenresUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getGenres(): Promise<GetPlatformsOutput> {
    return this.videogamesService.getGenres();
  }
}
