export type Videogame = {
  id: number;
  name: string;
  image: string | null;
  genres: string[];
  rating: number;
  platforms: string[];
  releaseDate: string | null;
};
