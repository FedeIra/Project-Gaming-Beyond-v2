import { z } from "zod";
import { Videogame } from "../../../models/rawgApi/videogame.js";

export const ApiVideogamesSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        image: z.string().nullable(),
        genres: z.array(z.string()),
        rating: z.number(),
        platforms: z.array(z.string()),
        releaseDate: z.string().nullable(),
    })
);

type ApiVideogameResponse = z.infer<typeof ApiVideogamesSchema>;

export function toModelVideogames(response: ApiVideogameResponse) : Videogame[] {
    return response.map((game) => ({
        id: game.id,
        name: game.name,
        image: game.image,
        genres: game.genres,
        rating: game.rating,
        platforms: game.platforms,
        releaseDate: game.releaseDate,
    }));
}



