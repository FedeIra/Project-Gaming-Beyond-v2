export interface IVideogame {
  _id: string;
  name: string;
  image: string | null;
  genres: string[];
  rating: number;
  platforms: string[];
  releaseDate: string | null;
  description: string;
}
