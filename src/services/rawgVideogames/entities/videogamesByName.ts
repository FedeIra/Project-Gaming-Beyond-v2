import { z } from 'zod';

import { VideogameByName } from '../../../models/rawgApi/videogame.js';

export const ApiVideogamesByNameSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable(),
    genres: z.array(z.string()),
  })
);

type ApiVideogameByNameResponse = z.infer<typeof ApiVideogamesByNameSchema>;

export function toModelVideogamesByName(
  response: ApiVideogameByNameResponse
): VideogameByName[] {
  return response.map((game) => ({
    id: game.id,
    name: game.name,
    image: game.image,
    genres: game.genres,
  }));
}
