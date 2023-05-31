import { FastifyInstance } from "fastify";
import { RawgApiClient } from "../../pkg/rawgApiClient/rawgApiClient.js";
import config from "../../pkg/env/config.js";
import { z } from "zod";
import { RawgVideogamesService } from "../../src/services/catalogVideogames/videogamesService.js";
import { GetVideogamesUseCase } from "../../src/useCases/videogames.js";


const requestBodySchema = z.object({}).strict();

export function getVideogamesHandler(server: FastifyInstance) {
  server.post(`/videogames`, async (request, response) => {
    try {
      requestBodySchema.parse(request.body);

      const baseUrl = config.rawgApiBaseUrl || "";

      const rawgClient = new RawgApiClient({ baseUrl });

      const videogamesService = new RawgVideogamesService(rawgClient);

      const getVideogamesUseCase = new GetVideogamesUseCase(videogamesService);

      const videogames = await getVideogamesUseCase.getVideogames();
      return videogames;
    } catch (error) {
      throw error;
    }
  })
};


