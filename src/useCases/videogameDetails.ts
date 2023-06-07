import { VideogameDetail } from '../models/rawgApi/videogameDetail.js';
import { VideogamesService } from '../services/rawgVideogames/videogamesService.js';

export type GetVideogameDetailInput = {
  videogameId: number;
};

export type GetVideogameDetailOutput = VideogameDetail;

export class GetVideogameDetailUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getVideogameDetail(
    input: GetVideogameDetailInput
  ): Promise<GetVideogameDetailOutput> {
    return this.videogamesService.getVideogameDetail(input);
  }
}
