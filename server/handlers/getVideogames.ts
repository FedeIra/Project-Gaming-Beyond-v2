import { FastifyInstance } from "fastify";
import { RawgApiClient } from "../../pkg/rawgApiClient/rawgApiClient.js";
import config from "../../pkg/env/config.js";
import { RawgVideogamesService } from "../../src/services/catalogVideogames/videogamesService.js";
import { GetVideogamesInput as UseCaseGetVideogamesInput, GetVideogamesUseCase } from "../../src/useCases/videogames.js";


export function getVideogamesHandler(app: FastifyInstance) {
  app.post(`/videogames`, async (request, response) => {
    try {

      const baseUrl = config.rawgApiBaseUrl || "";

      const rawgClient = new RawgApiClient({ baseUrl });

      const videogamesService = new RawgVideogamesService(rawgClient);

      const getVideogamesUseCase = new GetVideogamesUseCase(videogamesService);

      const rawBody = request.body;

      const videogames = await getVideogamesUseCase.getVideogames(rawBody as UseCaseGetVideogamesInput);

      return videogames;
    } catch (error) {
      throw error;
    }
  })
};
