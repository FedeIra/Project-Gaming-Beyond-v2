import Fastify from 'fastify';
import cors from '@fastify/cors';

import config from '../pkg/env/config.js';

import { setupErrorHandler } from './errorHandler.js';
import { videogamesRawgDbHandlers } from './dbRawgHandlersIndex.js';
import { videogamesRawgApiHandlers } from './rawgApiHandlersIndex.js';
import { dataBaseHandlers } from './dbHandlersIndex.js';

const fastifyServer = Fastify();
const port = Number(config.port) || 3000;

await fastifyServer.register(cors, {
  origin: [
    `http://localhost:3000`,
    `http://localhost:3001`,
    `https://project-gaming-beyond-v2-production.up.railway.app/`,
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

videogamesRawgDbHandlers(fastifyServer);
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
