import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import config from '../../pkg/env/config.js';

import { RawgApiClient } from '../../pkg/rawgApiClient/rawgApiClient.js';
import { RawgVideogamesService } from '../../src/services/rawgVideogames/videogamesService.js';
import {
  GetVideogamesByNameInput as UseCaseGetVideogamesByNameInput,
  GetVideogamesByNameUseCase,
} from '../../src/useCases/rawgApiCases/videogamesByName.js';

import { DatabaseClient } from '../../pkg/dbClient/databaseClient.js';
import { VideogamesServiceDB } from '../../src/services/dataBase/dataBaseService.js';

const getVideogamesByNameInputSchema = z.object({
  name: z.string().nonempty().min(3).max(25),
});

type GetVideogamesByNameInput = z.infer<typeof getVideogamesByNameInputSchema>;

export function getVideogamesByNameHandler(server: FastifyInstance) {
  server.post(`/videogames/search`, async (request, response) => {
    try {
      const rawBody = request.body;

      const input = getVideogamesByNameInputSchema.parse(rawBody);

      const rawgVideogames = await getVideogamesRawg(input);

      const dbVideogames = await getVideogamesDb(input);

      const allVideogames = [...rawgVideogames, ...dbVideogames];

      return allVideogames;
    } catch (error) {
      throw error;
    }
  });
}

const getVideogamesRawg = async (input: GetVideogamesByNameInput) => {
  const baseUrl = config.rawgApiBaseUrl || '';

  const rawgClient = new RawgApiClient({ baseUrl });

  const videogamesService = new RawgVideogamesService(rawgClient);

  const getVideogamesByNameUseCase = new GetVideogamesByNameUseCase(
    videogamesService
  );

  const rawgVideogames = await getVideogamesByNameUseCase.getVideogamesByName(
    toUseCaseInput(input)
  );

  return rawgVideogames;
};

const getVideogamesDb = async (input: GetVideogamesByNameInput) => {
  const dbClient = new DatabaseClient({
    connectionString: config.dbHost as string,
  });

  await dbClient.connect();

  const dbVideogamesService = new VideogamesServiceDB(dbClient);

  const videogamesDB = await dbVideogamesService.getVideogamesByNameDB(
    toUseCaseInput(input)
  );

  return videogamesDB;
};

const toUseCaseInput = (
  input: GetVideogamesByNameInput
): UseCaseGetVideogamesByNameInput => ({
  name: input.name,
});
