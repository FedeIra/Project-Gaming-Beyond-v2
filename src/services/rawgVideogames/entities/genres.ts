import { z } from "zod";

import { GenreName } from "../../../models/rawgApi/genres.js";

export const ApiGenresSchema = z.array(
  z.string()
);

type ApiGenresResponse = z.infer<typeof ApiGenresSchema>;

export function toModelGenres(response: ApiGenresResponse) : GenreName {
  return response;
}
