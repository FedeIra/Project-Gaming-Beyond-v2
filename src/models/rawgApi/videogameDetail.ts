export type VideogameDetail = {
  name: string;
  image: string;
  description: string;
  genres: string[];
  rating: number;
  totalReviews: number;
  platforms: string[];
  releaseDate: string;
  stores: string[];
}

export interface Store {
  id: number;
  url: string;
  store: StoreClass;
}

export interface StoreClass {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

