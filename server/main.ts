import fastify from 'fastify';

import config from '../pkg/env/config.js';

import { setupErrorHandler } from './errorHandler.js';
import { videogamesRawgApiHandlers } from './rawgApiHandlers.js';
import { dataBaseHandlers } from './dbHandlers.js';

const fastifyServer = fastify();
const port = Number(config.port) || 3000;

videogamesRawgApiHandlers(fastifyServer);
dataBaseHandlers(fastifyServer);
setupErrorHandler(fastifyServer);

const startServer = async () => {
  try {
    await fastifyServer.listen({ port });
    console.log(`Listening at http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const start = async () => {
  await startServer();
};

start();
