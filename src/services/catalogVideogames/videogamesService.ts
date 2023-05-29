import { RawgApiClient } from "../../../pkg/rawgApiClient/rawgApiClient.js";
import { Videogame } from "../../models/videogame.js";
import { GetVideogamesPayload, getVideogamesResponseSchema } from "./endpoints/getVideogames.js";
import { toModelVideogames } from "./entities/videogames.js";
import config from "../../../pkg/env/config.js";
export interface VideogamesService {
    getVideogames(payload: GetVideogamesPayload): Promise<Videogame[]>;
}

export class RawgVideogamesService implements VideogamesService {
  constructor(private client: RawgApiClient) {}

  async getVideogames(payload: GetVideogamesPayload): Promise<Videogame[]> {

    const apiResponse: any = await this.client.send({
      method: "get",
      path: `/games?key=${config.api_key}&page=1`,
      payload,
    })

  const apiResponseResults = apiResponse.results.map((game: any) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre: any) => genre.name),
        rating: game.rating,
        platforms: game.platforms.map((platform: any) => platform.platform.name),
        releaseDate: game.released,
      };
    });

    const apiResponseValidation = getVideogamesResponseSchema.parse(apiResponseResults);
    const videogames = toModelVideogames(apiResponseValidation);
    return videogames;
  }
}
