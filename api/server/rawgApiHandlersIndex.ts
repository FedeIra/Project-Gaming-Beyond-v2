import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import { getGenresHandler } from './rawgApiHandlers/getGenres.js';
import { getPlatformsHandler } from './rawgApiHandlers/getPlatforms.js';

export const videogamesRawgApiHandlers = (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>
) => {
  getGenresHandler(server);
  getPlatformsHandler(server);
};
