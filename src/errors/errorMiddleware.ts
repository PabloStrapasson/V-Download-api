import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './errorHandler';
import { ZodError } from 'zod';

export function errorMiddleware(
  error: Error & Partial<ErrorHandler> & ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = error.status ?? 500;
  const message = error.status ? error.message : 'Internal server error';
  res.status(statusCode).json({ message });
  next();
}
