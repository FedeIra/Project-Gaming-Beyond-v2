import { z } from 'zod';

import { IVideogame } from '../../../models/dataBase/iVideogame.js';

export const DbVideogamesSchema = z.object({
  _id: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  genres: z.array(z.string()),
  rating: z.number(),
  platforms: z.array(z.string()),
  description: z.string(),
  releaseDate: z.string().nullable(),
});

type DbVideogamesResponse = z.infer<typeof DbVideogamesSchema>;

export const toModelVideogameDB = (
  response: DbVideogamesResponse
): IVideogame => {
  return {
    id: response._id.toString(),
    name: response.name,
    image: response.image,
    genres: response.genres,
    rating: response.rating,
    platforms: response.platforms,
    description: response.description,
    releaseDate: response.releaseDate,
  };
};
