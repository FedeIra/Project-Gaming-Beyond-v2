import { Videogame } from "../models/rawgApi/videogame.js";
import { VideogamesService } from "../services/rawgVideogames/videogamesService.js";

export type GetVideogamesOutput = Videogame[];
export class GetVideogamesUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getVideogames(): Promise<GetVideogamesOutput> {
    return this.videogamesService.getVideogames();
  }
}
