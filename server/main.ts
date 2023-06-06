import fastify from 'fastify'
import config from '../pkg/env/config.js';
import { DatabaseClient } from '../pkg/dbClient/databaseClient.js';

import { setupErrorHandler } from './errorHandler.js';
import { videogamesRawgApiHandlers } from './rawgApiHandlers.js';
import { createVideogameDBHandler } from './dbHandlers/createVideogame.js';

const fastifyServer = fastify();
const port = Number(config.port) || 3000;

videogamesRawgApiHandlers(fastifyServer);
createVideogameDBHandler(fastifyServer);
setupErrorHandler(fastifyServer);

const startServer = async () => {
  try {
    await fastifyServer.listen({ port });
    console.log(`Listening at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// const connectToDatabase = async () => {
//   try {
//     const dbClient = new DatabaseClient({
//       connectionString: config.dbHost as string,
//     });
//     await dbClient.connect();
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

const start = async () => {
  await startServer();
  // await connectToDatabase();
}

start();
