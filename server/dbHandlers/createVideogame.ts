import config from "../../pkg/env/config.js";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { VideogamesServiceDB } from "../../src/services/dataBase/dataBaseService.js";
import { CreateVideogamesDBInput as useCaseCreateVideogameDBInput, CreateVideogamesDBUseCase } from "../../src/useCases/dataBaseCases/createVideogame.js";
import { DatabaseClient } from "../../pkg/dbClient/databaseClient.js";

const createVideogameDBInputSchema = z.object({
  name: z.string().nonempty().min(3).max(25),
  image: z.string().nonempty().min(3).max(100).nullable(),
  genres: z.array(z.string().nonempty().min(3).max(25)),
  rating: z.number().min(0).max(5),
  platforms: z.array(z.string().nonempty().min(3).max(25)),
  description: z.string().nonempty().min(3).max(100),
  releaseDate: z.string().nonempty().min(3).max(25).nullable(),
});

type CreateVideogamesDBInput = z.infer<typeof createVideogameDBInputSchema>;

export const createVideogameDBHandler = async (server: FastifyInstance) => {
  server.post(`/videogame/create`, async (request, response) => {

  try {

    const dbClient = new DatabaseClient({ connectionString: config.dbHost as string});

    await dbClient.connect();

    const dbVideogamesService = new VideogamesServiceDB(dbClient);

    const createVideogameUseCase = new CreateVideogamesDBUseCase(dbVideogamesService);

    const rawBody = request.body;

    const input = createVideogameDBInputSchema.parse(rawBody);

    const newVideogameId = await createVideogameUseCase.createVideogameDB(toUseCaseInput(input));

    return newVideogameId;
    } catch (error) {
        throw error;
      }
    }
  )
};

const toUseCaseInput = (input: CreateVideogamesDBInput): useCaseCreateVideogameDBInput => ({
  name: input.name,
  image: input.image,
  genres: input.genres,
  rating: input.rating,
  platforms: input.platforms,
  description: input.description,
  releaseDate: input.releaseDate,
});
