import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import { getVideogameDetailHandler } from './rawgApiHandlers/getVideogameDetail.js';
import { getGenresHandler } from './rawgApiHandlers/getGenres.js';
import { getPlatformsHandler } from './rawgApiHandlers/getPlatforms.js';

export const videogamesRawgApiHandlers = (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>
) => {
  getVideogameDetailHandler(server);
  getGenresHandler(server);
  getPlatformsHandler(server);
};
