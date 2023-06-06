import Mongoose, {Schema} from 'mongoose';
import config from '../../../pkg/env/config.js';
import { IVideogame } from './iVideogame.js';

export const VideogameSchema: Schema<IVideogame> = new Schema(
  {
    _id: { type: String, required: false, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
    genres: { type: [String], required: true },
    rating: { type: Number, required: true },
    platforms: { type: [String], required: true },
    description: { type: String, required: true },
    releaseDate: { type: String, required: false },
  },
  { timestamps: true }
);

export const VideogameModel = Mongoose.model(config.videogamesCollection as string, VideogameSchema);
