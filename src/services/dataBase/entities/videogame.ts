// import entities from rawgVideogames/entities as database:
import { z } from "zod";
import { ApiVideogamesSchema, toModelVideogames } from "../../rawgVideogames/entities/videogames.js";
import { Videogame } from "../../../models/rawgApi/videogame.js";

export const DbVideogamesSchema = ApiVideogamesSchema;

type DbVideogamesResponse = z.infer<typeof DbVideogamesSchema>;

// export const toModelVideogamesDB = (response: DbVideogamesResponse) : Videogame[] => {
//     return response.map((game) => ({
//         id: game.id,
//         name: game.name,
//         image: game.image,
//         genres: game.genres,
//         rating: game.rating,
//         platforms: game.platforms,
//         releaseDate: game.releaseDate,
//     }));
// }

export const toModelVideogamesDB = toModelVideogames as (response: DbVideogamesResponse) => Videogame[];
