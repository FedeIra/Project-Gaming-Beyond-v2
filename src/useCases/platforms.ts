import { PlatformNames } from "../models/rawgApi/platforms.js";
import { VideogamesService } from "../services/rawgVideogames/videogamesService.js";

export type GetPlatformsOutput = PlatformNames;

export class GetPlatformsUseCase {
  constructor(private videogamesService: VideogamesService) {}

  async getPlatforms(): Promise<GetPlatformsOutput> {
    return this.videogamesService.getPlatforms();
  }
}
