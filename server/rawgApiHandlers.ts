import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import { getVideogamesHandler } from './handlers/getVideogames.js';
import { getVideogameDetailHandler } from './handlers/getVideogameDetail.js';
import { getVideogamesByNameHandler } from './handlers/getVideogamesByName.js';
import { getGenresHandler } from './handlers/getGenres.js';
import { getPlatformsHandler } from './handlers/getPlatforms.js';

export const videogamesRawgApiHandlers = (server:
  FastifyInstance<Server, IncomingMessage, ServerResponse>
  ) => {
  getVideogamesHandler(server);
  getVideogameDetailHandler(server);
  getVideogamesByNameHandler(server);
  getGenresHandler(server);
  getPlatformsHandler(server);
}
