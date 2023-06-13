import { ApiVideogamesByNameSchema } from '../entities/videogamesByName.js';

export type GetVideogamesByNamePayload = {
  name: string;
};

export const getVideogamesByNameResponseSchema = ApiVideogamesByNameSchema;
