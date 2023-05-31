import { z } from "zod";
import { VideogameDetail } from "../../../models/videogameDetail.js";

export const ApiVideogameDetailSchema =
    z.object({
        name: z.string(),
        image: z.string(),
        description: z.string(),
        genres: z.array(z.string()),
        rating: z.number(),
        totalReviews: z.number(),
        platforms: z.array(z.string()),
        releaseDate: z.string(),
        stores: z.array(z.string()),
    }
  );

type ApiVideogameDetailResponse = z.infer<typeof ApiVideogameDetailSchema>;

export function toModelVideogameDetail(response: ApiVideogameDetailResponse) : VideogameDetail {
    return {
        name: response.name,
        image: response.image,
        description: response.description,
        genres: response.genres,
        rating: response.rating,
        totalReviews: response.totalReviews,
        platforms: response.platforms,
        releaseDate: response.releaseDate,
        stores: response.stores,
    };
}



