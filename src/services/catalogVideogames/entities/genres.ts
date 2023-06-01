import { z } from "zod";
import { GenreName } from "../../../models/genres.js";


export const ApiGenresSchema = z.array(
    z.object({
        name: z.string(),
    })
);

type ApiGenresResponse = z.infer<typeof ApiGenresSchema>;

export function toModelGenres(response: ApiGenresResponse) : GenreName[] {
    return response.map((genre) => {
        return {
            name: genre.name,
        };
    });
}



