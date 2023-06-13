export type CreateVideogameDBPayload = {
  name: string;
  image: string | null;
  genres: string[];
  rating: number;
  platforms: string[];
  description: string;
  releaseDate: string | null;
};
