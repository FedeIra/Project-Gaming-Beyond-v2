import { Videogame } from "../models/videogame.js";
import { VideogamesService } from "../services/catalogVideogames/videogamesService.js";

export type GetVideogamesInput = void;
export type GetVideogamesOutput = Videogame[];
export class GetVideogamesUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getVideogames(input: GetVideogamesInput): Promise<GetVideogamesOutput> {
    return this.videogamesService.getVideogames(input);
  }
}
