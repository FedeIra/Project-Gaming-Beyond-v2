import Mongoose, {Schema} from 'mongoose';
import { IVideogame } from '../rawgApi/videogame.js';

// export interface IVideogame extends Videogame {
// }

export const VideogameSchema: Schema<IVideogame> = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
    genres: { type: [String], required: true },
    rating: { type: Number, required: true },
    platforms: { type: [String], required: true },
    releaseDate: { type: String, required: false },
  },
  { timestamps: true }
);

export const VideogameModel = Mongoose.model('videogames', VideogameSchema);
