import { ApiVideogameDetailSchema } from "../entities/videogameDetail.js";

export type GetVideogameDetailPayload = {
  videogameId: number;
};

export const getVideogameDetailResponseSchema = ApiVideogameDetailSchema;

