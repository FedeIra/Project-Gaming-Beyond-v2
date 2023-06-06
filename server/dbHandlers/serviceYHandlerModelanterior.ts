// SERVICIO DE DB

// import { CreateVideogamesDBInput } from "../../useCases/dataBaseCases/createVideogame.js";
// import { CreateVideogameDBPayload } from "./endpoints/getVideogamesDB.js";
// import { IVideogame } from "../../models/rawgApi/videogame.js";
// import { VideogameModel } from "../../models/dataBase/videogame.js";

// export interface DbVideogamesService {
//   createVideogameDB(input: CreateVideogamesDBInput): Promise<IVideogame>;
// }

// export class VideogamesServiceDB implements DbVideogamesService {
//   constructor() {}

// async createVideogameDB(payload: CreateVideogameDBPayload): Promise<IVideogame> {

//   const existingVideogame = await this.getUser(payload.name);

//   if (existingVideogame) {
//     throw new Error("Videogame already exists");
//   }

//   console.log("🚀 ~ file: dataBaseService.ts:16 ~ VideogamesServiceDB ~ createVideogameDB ~ existingVideogame:", existingVideogame)

//   const newVideogame = await VideogameModel.create(payload);

//   return newVideogame;
//   }

//   async getUser(name: string): Promise<IVideogame | null> {
//     const existingVideogame = VideogameModel.findOne({ name });
//     console.log(`ESTOY EN LA FUNCION GETUSER`);
//     return existingVideogame;
//     // return VideogameModel.findOne({ name }).lean<IVideogame>().exec();
//   }
// }



// CONTROLADOR DE DB
// import config from "../../pkg/env/config.js";
// import { FastifyInstance } from "fastify";
// import { z } from "zod";
// import { VideogamesServiceDB } from "../../src/services/dataBase/dataBaseService.js";
// import { CreateVideogamesDBInput as useCaseCreateVideogameDBInput, CreateVideogamesDBUseCase } from "../../src/useCases/dataBaseCases/createVideogame.js";

// const createVideogameDBInputSchema = z.object({
//   name: z.string().nonempty().min(3).max(25),
//   image: z.string().nonempty().min(3).max(100).nullable(),
//   genres: z.array(z.string().nonempty().min(3).max(25)),
//   rating: z.number().min(0).max(5),
//   platforms: z.array(z.string().nonempty().min(3).max(25)),
//   description: z.string().nonempty().min(3).max(100),
//   releaseDate: z.string().nonempty().min(3).max(25).nullable(),
// });

// type CreateVideogamesDBInput = z.infer<typeof createVideogameDBInputSchema>;

// export const createVideogameDBHandler = async (server: FastifyInstance) => {
//   server.post(`/videogame/create`, async (request, response) => {
//   try {

//       const dbVideogamesService = new VideogamesServiceDB();

//       const createVideogameUseCase = new CreateVideogamesDBUseCase(dbVideogamesService);

//       const rawBody = request.body;

//       const input = createVideogameDBInputSchema.parse(rawBody);

//       // -----------------------------------

//       const newVideogame = await createVideogameUseCase.createVideogameDB(toUseCaseInput(input));

//       console.log(newVideogame);

//       return newVideogame;
//   } catch (error) {
//     throw error;
//   }
// }
// )};

// const toUseCaseInput = (input: CreateVideogamesDBInput): useCaseCreateVideogameDBInput => ({
//   name: input.name,
//   image: input.image,
//   genres: input.genres,
//   rating: input.rating,
//   platforms: input.platforms,
//   description: input.description,
//   releaseDate: input.releaseDate,
// });
