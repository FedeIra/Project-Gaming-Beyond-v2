import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { CustomError } from '../pkg/errors/customError.js';

export function setupErrorHandler(server: FastifyInstance) {
  server.setErrorHandler((err: Error | ZodError, request, response) => {
    let status: number = 500;
    let message: string = `Internal server error.`;
    let validationErrors;

    if (err instanceof ZodError) {
      status = 400;
      message = `Bad request.`;
      validationErrors = err.errors.map((error) => ({
        path: error.path.join('.'),
        message: error.message,
      }));
    }

    if (err instanceof CustomError) {
      status = err.getStatusCode();
      message = err.getMessage();
    }

    response.status(status).send({ error: message, validationErrors });
  });
}
