import fastify from 'fastify'
import config from '../pkg/env/config.js';
import { setupErrorHandler } from './errorHandler.js';
import { getVideogamesHandler } from './handlers/getVideogames.js';
import { getVideogameDetailHandler } from './handlers/getVideogameDetail.js';
import { getVideogamesByNameHandler } from './handlers/getVideogamesByName.js';
import { getGenresHandler } from './handlers/getGenres.js';
import { getPlatformsHandler } from './handlers/getPlatforms.js';
import { createVideogameHandler } from './dbHandlers/createVideogame.js';

const server = fastify();

createVideogameHandler(server);
getVideogamesHandler(server);
getVideogameDetailHandler(server);
getVideogamesByNameHandler(server);
getGenresHandler(server);
getPlatformsHandler(server);

setupErrorHandler(server);

const port = Number(config.port) || 3000;

try {
  await server.listen({ port });
  console.log(`Listening at http://localhost:${port}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
