import { string } from 'zod';

import { DbVideogamesSchema } from '../entities/videogame.js';

export const getVideogameDbSchema = DbVideogamesSchema.omit({
  _id: true,
}).extend({
  id: string(),
});
