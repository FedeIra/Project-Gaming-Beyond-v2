import { FastifyInstance } from "fastify";
import { RawgApiClient } from "../../pkg/rawgApiClient/rawgApiClient.js";
import config from "../../pkg/env/config.js";
import { z } from "zod";
import { RawgVideogamesService } from "../../src/services/catalogVideogames/videogamesService.js";
import { GetVideogameDetailInput as UseCaseGetVideogameDetailInput, GetVideogameDetailUseCase } from "../../src/useCases/videogameDetails.js";

const getVideogameDetailInputSchema = z.object({
  videogameId: z.number(),
});

type GetVideogameDetailInput = z.infer<typeof getVideogameDetailInputSchema>;

export function getVideogameDetailHandler(server: FastifyInstance) {
  server.post(`/videogame/detail`, async (request, response) => {
    try {

      const baseUrl = config.rawgApiBaseUrl || "";

      const rawgClient = new RawgApiClient({ baseUrl });

      const rawgVideogamesService = new RawgVideogamesService(rawgClient);

      const getVideogameDetailUseCase = new GetVideogameDetailUseCase(rawgVideogamesService);

      const rawBody = request.body;

      const input = getVideogameDetailInputSchema.parse(rawBody);

      const videogameDetail = await getVideogameDetailUseCase.getVideogameDetail(toUseCaseInput(input));

      return videogameDetail;

    } catch (error) {
      throw error;
    }
  })
};

function toUseCaseInput(input: GetVideogameDetailInput): UseCaseGetVideogameDetailInput {
  return {
    videogameId: input.videogameId,
  }
}
