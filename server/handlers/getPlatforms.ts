import { FastifyInstance } from "fastify";
import { RawgApiClient } from "../../pkg/rawgApiClient/rawgApiClient.js";
import config from "../../pkg/env/config.js";
import { z } from "zod";
import { RawgVideogamesService } from "../../src/services/catalogVideogames/videogamesService.js";
import { GetPlatformsUseCase } from "../../src/useCases/platforms.js";


const requestBodySchema = z.object({}).strict();

export function getPlatformsHandler(server: FastifyInstance) {
  server.post(`/platforms`, async (request, response) => {
    try {
      requestBodySchema.parse(request.body);

      const baseUrl = config.rawgApiBaseUrl || "";

      const rawgClient = new RawgApiClient({ baseUrl });

      const videogamesService = new RawgVideogamesService(rawgClient);

      const getPlatformsUseCase = new GetPlatformsUseCase(videogamesService);

      const platforms = await getPlatformsUseCase.getPlatforms();
      return platforms;
    } catch (error) {
      throw error;
    }
  })
};


