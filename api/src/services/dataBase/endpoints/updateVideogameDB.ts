export type UpdateVideogameDBPayload = {
  id: string;
  name: string;
  image: string;
  genres: string[];
  rating: number;
  platforms: string[];
  releaseDate: string;
  description: string;
};
