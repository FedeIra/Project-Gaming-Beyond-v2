import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import config from '../../pkg/env/config.js';
import { RawgApiClient } from '../../pkg/rawgApiClient/rawgApiClient.js';
import { RawgVideogamesService } from '../../src/services/rawgVideogames/videogamesService.js';
import {
  GetVideogamesByNameInput as UseCaseGetVideogamesByNameInput,
  GetVideogamesByNameUseCase,
} from '../../src/useCases/videogamesByName.js';

const getVideogamesByNameInputSchema = z.object({
  name: z.string().nonempty().min(3).max(25),
});

type GetVideogamesByNameInput = z.infer<typeof getVideogamesByNameInputSchema>;

export function getVideogamesByNameHandler(server: FastifyInstance) {
  server.post(`/videogames/search`, async (request, response) => {
    try {
      const baseUrl = config.rawgApiBaseUrl || '';

      const rawgClient = new RawgApiClient({ baseUrl });

      const videogamesService = new RawgVideogamesService(rawgClient);

      const getVideogamesByNameUseCase = new GetVideogamesByNameUseCase(
        videogamesService
      );

      const rawBody = request.body;

      const input = getVideogamesByNameInputSchema.parse(rawBody);

      const videogames = await getVideogamesByNameUseCase.getVideogamesByName(
        toUseCaseInput(input)
      );

      return videogames;
    } catch (error) {
      throw error;
    }
  });
}

const toUseCaseInput = (
  input: GetVideogamesByNameInput
): UseCaseGetVideogamesByNameInput => ({
  name: input.name,
});
