import { z } from 'zod';
import { FastifyInstance } from 'fastify';

import config from '../../pkg/env/config.js';

import { RawgApiClient } from '../../pkg/rawgApiClient/rawgApiClient.js';
import { RawgVideogamesService } from '../../src/services/rawgVideogames/videogamesService.js';
import { GetVideogamesUseCase } from '../../src/useCases/rawgApiCases/videogames.js';

import { DatabaseClient } from '../../pkg/dbClient/databaseClient.js';
import { VideogamesServiceDB } from '../../src/services/dataBase/dataBaseService.js';

const requestBodySchema = z.object({}).strict();

export function getVideogamesHandler(server: FastifyInstance) {
  server.post(`/videogames`, async (request, response) => {
    try {
      requestBodySchema.parse(request.body);

      const videogamesAPI = await getVideogamesRawg();

      const videogamesDB = await getVideogamesDB();

      const allVideogames = [...videogamesAPI, ...videogamesDB];

      return allVideogames;
    } catch (error) {
      throw error;
    }
  });
}

const getVideogamesRawg = async () => {
  const baseUrl = config.rawgApiBaseUrl || '';

  const rawgClient = new RawgApiClient({ baseUrl });

  const videogamesService = new RawgVideogamesService(rawgClient);

  const getVideogamesUseCase = new GetVideogamesUseCase(videogamesService);

  const videogamesAPI = await getVideogamesUseCase.getVideogames();

  return videogamesAPI;
};

const getVideogamesDB = async () => {
  const dbClient = new DatabaseClient({
    connectionString: config.dbHost as string,
  });

  await dbClient.connect();

  const dbVideogamesService = new VideogamesServiceDB(dbClient);

  const videogamesDB = await dbVideogamesService.getAllVideogamesDB();

  return videogamesDB;
};
