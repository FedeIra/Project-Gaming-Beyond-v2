// create handler to create videogame in database taking as example other handlers:

// Path: server\services\dataBase\endpoints\createVideogameDB.ts

import { FastifyInstance } from "fastify";
import { DatabaseClient } from "../../pkg/dbClient/databaseClient.js";
import config from "../../pkg/env/config.js";
import { z } from "zod";
import { DbVideogamesService } from "../../src/services/dataBase/dataBaseService.js";
import { CreateVideogamesDBInput as CreateVideogamesInput, CreateVideogamesDBUseCase } from "../../src/useCases/dataBaseCases/createVideogame.js";

const createVideogameInputSchema = z.object({
  name: z.string().nonempty().min(3).max(25),
  description: z.string().nonempty().min(3).max(100),
  released: z.string().nonempty().min(3).max(25),
  background_image: z.string().nonempty().min(3).max(100),
  rating: z.number().min(0).max(5),
  platforms: z.string().nonempty().min(3).max(25),
});

type CreateVideogameInput = z.infer<typeof createVideogameInputSchema>;

export function createVideogameHandler(server: FastifyInstance) {
  server.post(`/videogame/create`, async (request, response) => {
    try {

      // use config to get database url

      const dbUrl = config.dbHost || "";

      const dbClient = new DatabaseClient({ dbUrl });

      const videogamesService = new DbVideogamesService(dbClient);

      const createVideogameUseCase = new CreateVideogamesDBUseCase(videogamesService);

      const rawBody = request.body;

      const input = createVideogameInputSchema.parse(rawBody);

      const videogames = await createVideogameUseCase.createVideogame(toUseCaseInput(input));

      return videogames;
    } catch (error) {
      throw error;
    }
  })
}

const toUseCaseInput = (input: CreateVideogameInput): CreateVideogamesInput => ({
  name: input.name,
  description: input.description,
  released: input.released,
  background_image: input.background_image,
  rating: input.rating,
  platforms: input.platforms,
});


