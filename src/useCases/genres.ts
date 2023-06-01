import { GenreName } from "../models/genres.js";
import { VideogamesService } from "../services/catalogVideogames/videogamesService.js";

export type GetPlatformsOutput = GenreName;

export class GetGenresUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getGenres(): Promise<GetPlatformsOutput> {
    return this.videogamesService.getGenres();
  }
}
