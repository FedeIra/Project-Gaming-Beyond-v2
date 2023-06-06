import { DbVideogamesSchema } from "../entities/videogame.js";

export type CreateVideogameDBPayload = {
  name: string;
  image: string | null;
  genres: string[];
  rating: number;
  platforms: string[];
  description: string;
  releaseDate: string | null;
};

export const getVideogamesDBResponseSchema = DbVideogamesSchema;
