import fastify from 'fastify'
import config from '../pkg/env/config.js';
import { getVideogamesHandler } from './handlers/getVideogames.js';

const server = fastify();

getVideogamesHandler(server);

const PORT = config.port || 3000;

try {
  await server.listen( PORT );
  console.log(`Listening at http://localhost:${PORT}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
