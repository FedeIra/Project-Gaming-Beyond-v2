import { z } from 'zod';

import { PlatformNames } from '../../../models/rawgApi/platforms.js';

export const ApiPlatformsSchema = z.array(z.string());

type ApiPlatformsResponse = z.infer<typeof ApiPlatformsSchema>;

export function toModelPlatforms(
  response: ApiPlatformsResponse
): PlatformNames {
  return response;
}
