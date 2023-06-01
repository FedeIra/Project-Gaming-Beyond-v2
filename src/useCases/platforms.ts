import { PlatformNames } from "../models/platforms.js";
import { VideogamesService } from "../services/catalogVideogames/videogamesService.js";

export type GetPlatformsOutput = PlatformNames;

export class GetPlatformsUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getPlatforms(): Promise<GetPlatformsOutput> {
    return this.videogamesService.getPlatforms();
  }
}
