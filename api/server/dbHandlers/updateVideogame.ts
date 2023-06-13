import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import config from '../../pkg/env/config.js';
import { DatabaseClient } from '../../pkg/dbClient/databaseClient.js';
import { VideogamesServiceDB } from '../../src/services/dataBase/dataBaseService.js';
import {
  UpdateVideogameDBInput as useCaseUpdateVideogameDBInput,
  UpdateVideogameDBUseCase,
} from '../../src/useCases/dataBaseCases/updateVideogame.js';

const updateVideogameDBInputSchema = z.object({
  id: z.string().nonempty().min(3).max(25),
  name: z.string().nonempty().min(3).max(25),
  image: z.string().nonempty().min(3).max(200).nullable(),
  genres: z.array(z.string().nonempty().min(3).max(25)),
  rating: z.number().min(0).max(5),
  platforms: z.array(z.string().nonempty().min(3).max(25)),
  description: z.string().nonempty().min(3).max(300),
  releaseDate: z.string().nonempty().min(3).max(25).nullable(),
});

type UpdateVideogamesDBInput = z.infer<typeof updateVideogameDBInputSchema>;

export const updateVideogameDBHandler = async (server: FastifyInstance) => {
  server.post(`/videogame/update`, async (request, response) => {
    try {
      const dbClient = new DatabaseClient({
        connectionString: config.dbHost as string,
      });

      await dbClient.connect();

      const dbVideogamesService = new VideogamesServiceDB(dbClient);

      const updateVideogameUseCase = new UpdateVideogameDBUseCase(
        dbVideogamesService
      );

      const rawBody = request.body;

      const input = updateVideogameDBInputSchema.parse(rawBody);

      const updateVideogame = await updateVideogameUseCase.updateVideogameDB(
        toUseCaseInput(input)
      );

      return updateVideogame;
    } catch (error) {
      throw error;
    }
  });
};

const toUseCaseInput = (
  input: UpdateVideogamesDBInput
): useCaseUpdateVideogameDBInput => ({
  id: input.id,
  name: input.name,
  image: input.image,
  genres: input.genres,
  rating: input.rating,
  platforms: input.platforms,
  description: input.description,
  releaseDate: input.releaseDate,
});
