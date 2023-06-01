import { GenreName } from "../models/genres.js";
import { VideogamesService } from "../services/catalogVideogames/videogamesService.js";

export type GetVideogamesOutput = GenreName[];

export class GetGenresUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getGenres(): Promise<GetVideogamesOutput> {
    return this.videogamesService.getGenres();
  }
}
