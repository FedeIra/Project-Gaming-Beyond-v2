import { FastifyInstance } from "fastify";
import config from "../../pkg/env/config.js";
import { z } from "zod";
import { VideogamesServiceDB } from "../../src/services/dataBase/dataBaseService.js";
import { CreateVideogamesDBInput as CreateVideogamesInput, CreateVideogamesDBUseCase } from "../../src/useCases/dataBaseCases/createVideogame.js";
import { DatabaseClient } from "../../pkg/dbClient/databaseClient.js";

const createVideogameInputSchema = z.object({
  name: z.string().nonempty().min(3).max(25),
  image: z.string().nonempty().min(3).max(100).nullable(),
  genres: z.array(z.string().nonempty().min(3).max(25)),
  rating: z.number().min(0).max(5),
  description: z.string().nonempty().min(3).max(100),
  platforms: z.array(z.string().nonempty().min(3).max(25)),
  releaseDate: z.string().nonempty().min(3).max(25).nullable(),
});

type CreateVideogameInput = z.infer<typeof createVideogameInputSchema>;

export function createVideogameHandler(server: FastifyInstance) {
  server.post(`/videogame/create`, async (request, response) => {
    try {

        const dbUrl = config.dbHost || "";

        const dbClient = new DatabaseClient({ connectionString: dbUrl });

        const dbVideogamesService = new VideogamesServiceDB(dbClient);

        const createVideogameUseCase = new CreateVideogamesDBUseCase(dbVideogamesService);

        const rawBody = request.body;

        const input = createVideogameInputSchema.parse(rawBody);

        const videogame = await createVideogameUseCase.createVideogameDB(toUseCaseInput(input));

        return videogame;
    } catch (error) {
      throw error;
    }
  })
}

const toUseCaseInput = (input: CreateVideogameInput): CreateVideogamesInput => ({
  name: input.name,
  image: input.image,
  genres: input.genres,
  rating: input.rating,
  platforms: input.platforms,
  releaseDate: input.releaseDate,
});


