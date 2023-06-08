import { z } from 'zod';
import { FastifyInstance } from 'fastify';

import config from '../../pkg/env/config.js';
import { RawgApiClient } from '../../pkg/rawgApiClient/rawgApiClient.js';
import { RawgVideogamesService } from '../../src/services/rawgVideogames/videogamesService.js';
import { DatabaseClient } from '../../pkg/dbClient/databaseClient.js';
import { VideogamesServiceDB } from '../../src/services/dataBase/dataBaseService.js';

import {
  GetVideogameDetailInput as UseCaseGetVideogameDetailInput,
  GetVideogameDetailUseCase,
} from '../../src/useCases/rawgApiCases/videogameDetails.js';

import { GetVideogameByIdInput as UseCaseGetVideogameDetailInputDB } from '../../src/useCases/dataBaseCases/getVideogameById.js';

const getVideogameDetailInputSchema = z.object({
  videogameId: z.union([
    z.number().positive(),
    z.string().nonempty().min(3).max(25),
  ]),
});

type GetVideogameDetailInput = z.infer<typeof getVideogameDetailInputSchema>;

export function getVideogameDetailHandler(server: FastifyInstance) {
  server.post(`/videogame/detail`, async (request, response) => {
    try {
      const rawBody = request.body;

      const input = getVideogameDetailInputSchema.parse(rawBody);

      let videogameDetail;

      if (typeof input.videogameId === 'number') {
        videogameDetail = await getVideogameRawg(input);
      }

      if (typeof input.videogameId === 'string') {
        videogameDetail = await getVideogameDb(input);
      }
      return videogameDetail;
    } catch (error) {
      throw error;
    }
  });
}

const getVideogameRawg = async (input: GetVideogameDetailInput) => {
  const baseUrl = config.rawgApiBaseUrl || '';

  const rawgClient = new RawgApiClient({ baseUrl });

  const rawgVideogamesService = new RawgVideogamesService(rawgClient);

  const getVideogameDetailUseCase = new GetVideogameDetailUseCase(
    rawgVideogamesService
  );

  const videogameDetail = await getVideogameDetailUseCase.getVideogameDetail(
    input as UseCaseGetVideogameDetailInput
  );

  return videogameDetail;
};

const getVideogameDb = async (input: GetVideogameDetailInput) => {
  const dbClient = new DatabaseClient({
    connectionString: config.dbHost as string,
  });

  await dbClient.connect();

  const dbVideogamesService = new VideogamesServiceDB(dbClient);

  const videogameDB = await dbVideogamesService.getVideogameByIdDB(
    input as UseCaseGetVideogameDetailInputDB
  );
  return videogameDB;
};
