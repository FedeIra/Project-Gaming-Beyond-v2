import { RawgApiClient } from "../../../pkg/rawgApiClient/rawgApiClient.js";
import config from "../../../pkg/env/config.js";

import { Videogame } from "../../models/videogame.js";
import { Result, Genre, PlatformElement } from "../../models/videogames.js";
import { GetVideogamesPayload, getVideogamesResponseSchema } from "./endpoints/getVideogames.js";
import { toModelVideogames } from "./entities/videogames.js";
import { GetVideogamesInput } from "../../useCases/videogames.js";

import { VideogameDetail, Store } from "../../models/videogameDetail.js";
import { GetVideogameDetailPayload, getVideogameDetailResponseSchema } from "./endpoints/getVideogameDetail.js";
import { toModelVideogameDetail } from "./entities/videogameDetail.js";
import { GetVideogameDetailInput } from "../../useCases/videogameDetails.js";




export interface VideogamesService {
    getVideogames(payload: GetVideogamesInput): Promise<Videogame[]>;
    getVideogameDetail(input: GetVideogameDetailInput): Promise<VideogameDetail>;
}

export class RawgVideogamesService implements VideogamesService {
  constructor(private client: RawgApiClient) {}

  async getVideogames(payload: GetVideogamesPayload): Promise<Videogame[]> {

    const totalPages = 10;
    const apiResponse = [];

    for (let page = 1; page < totalPages; page++) {
      const apiResponsePage: any = await this.client.send({
        method: "get",
        path: `/games?key=${config.api_key}&page=${page}`,
        payload,
    });
    apiResponse.push(...apiResponsePage.results);
    }

  const apiResponseResults = apiResponse.map((game: Result) => {
      return {
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre: Genre) => genre.name),
        rating: game.rating,
        platforms: game.platforms.map((platform: PlatformElement) => platform.platform.name),
        releaseDate: game.released,
      };
    });

    const apiResponseValidation = getVideogamesResponseSchema.parse(apiResponseResults);
    const videogames = toModelVideogames(apiResponseValidation);
    return videogames;
  }

  async getVideogameDetail(payload: GetVideogameDetailPayload): Promise<VideogameDetail> {

    const videogameId = payload.videogameId;

    const apiResponse: any = await this.client.send({
      method: "get",
      path: `/games/${videogameId}?key=${config.api_key}`,
      payload,
  });

  const apiResponseFilter =  {
    name: apiResponse.name,
    image: apiResponse.background_image,
    description: apiResponse.description,
    genres: apiResponse.genres.map((genre: Genre) => genre.name),
    rating: apiResponse.rating,
    totalReviews: apiResponse.ratings_count,
    platforms: apiResponse.platforms.map((platform: PlatformElement) => platform.platform.name),
    releaseDate: apiResponse.released,
    stores: apiResponse.stores.map((store: Store) => store.store.domain),
  };

  console.log(apiResponseFilter);


  const apiResponseValidation = getVideogameDetailResponseSchema.parse(apiResponseFilter);
  const videogameDetail = toModelVideogameDetail(apiResponseValidation);

  return videogameDetail;
  }
}
