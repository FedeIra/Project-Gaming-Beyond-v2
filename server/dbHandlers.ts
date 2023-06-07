import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import { createVideogameDBHandler } from "./dbHandlers/createVideogame.js";
import { deleteVideogameDBHandler } from "./dbHandlers/deleteVideogame.js";

export const dataBaseHandlers = (server:
  FastifyInstance<Server, IncomingMessage, ServerResponse>
  ) => {
    createVideogameDBHandler(server);
    deleteVideogameDBHandler(server);
}
