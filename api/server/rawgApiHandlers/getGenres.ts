import { FastifyInstance } from 'fastify';
import { RawgApiClient } from '../../pkg/rawgApiClient/rawgApiClient.js';
import { z } from 'zod';

import config from '../../pkg/env/config.js';
import { RawgVideogamesService } from '../../src/services/rawgVideogames/videogamesService.js';
import { GetGenresUseCase } from '../../src/useCases/rawgApiCases/genres.js';

const requestBodySchema = z.object({}).strict();

export function getGenresHandler(server: FastifyInstance) {
  server.post(`/genres`, async (request, response) => {
    try {
      requestBodySchema.parse(request.body);

      const baseUrl = config.rawgApiBaseUrl || '';

      const rawgClient = new RawgApiClient({ baseUrl });

      const videogamesService = new RawgVideogamesService(rawgClient);

      const getGenresUseCase = new GetGenresUseCase(videogamesService);

      const genres = await getGenresUseCase.getGenres();
      return genres;
    } catch (error) {
      throw error;
    }
  });
}
