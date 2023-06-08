import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

import { getVideogamesHandler } from './dbRawgHandlers/getVideogames.js';
import { getVideogamesByNameHandler } from './dbRawgHandlers/getVideogamesByName.js';

export const videogamesRawgDbHandlers = (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>
) => {
  getVideogamesHandler(server);
  getVideogamesByNameHandler(server);
};
