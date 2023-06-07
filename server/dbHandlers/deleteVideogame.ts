import config from "../../pkg/env/config.js";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { VideogamesServiceDB } from "../../src/services/dataBase/dataBaseService.js";
import { DeleteVideogameDBInput as useCaseDeleteVideogameDBInput, DeleteVideogameDBUseCase } from "../../src/useCases/dataBaseCases/deleteVideogame.js";
import { DatabaseClient } from "../../pkg/dbClient/databaseClient.js";

const deleteVideogameDBInputSchema = z.object({
  id: z.string(),
});

type DeleteVideogamesDBInput = z.infer<typeof deleteVideogameDBInputSchema>;

export const deleteVideogameDBHandler = async (server: FastifyInstance) => {
  server.post(`/videogame/delete`, async (request, response) => {

  try {

    const dbClient = new DatabaseClient({ connectionString: config.dbHost as string});

    await dbClient.connect();

    const dbVideogamesService = new VideogamesServiceDB(dbClient);

    const deleteVideogameUseCase = new DeleteVideogameDBUseCase(dbVideogamesService);

    const rawBody = request.body;

    const input = deleteVideogameDBInputSchema.parse(rawBody);

    const message = await deleteVideogameUseCase.deleteVideogameDB(toUseCaseInput(input));

    return message;
    } catch (error) {
        throw error;
      }
    }
  )
};

const toUseCaseInput = (input: DeleteVideogamesDBInput): useCaseDeleteVideogameDBInput => ({
  videogameId: input.id,
});
