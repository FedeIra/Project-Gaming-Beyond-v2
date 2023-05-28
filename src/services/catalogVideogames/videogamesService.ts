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
    const apiResponse = await this.client.send({
      method: "get",
      path: `/games?key=${config.api_key}&page=1`,
      payload,
    })
    const apiResponseValidation = getVideogamesResponseSchema.parse(apiResponse);
    const videogames = toModelVideogames(apiResponseValidation);
    return videogames;
  }
}
