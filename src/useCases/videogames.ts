import { Videogame } from "../models/videogame.js";
import { VideogamesService } from "../services/catalogVideogames/videogamesService.js";

export type GetVideogamesOutput = Videogame[];
export class GetVideogamesUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getVideogames(): Promise<GetVideogamesOutput> {
    return this.videogamesService.getVideogames();
  }
}
