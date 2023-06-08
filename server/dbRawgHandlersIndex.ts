import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import { getVideogamesHandler } from './dbAndApiHandlers/getVideogames.js';

export const videogamesRawgDbHandlers = (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>
) => {
  getVideogamesHandler(server);
};
