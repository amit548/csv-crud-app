import type { ErrorRequestHandler, Response } from 'express';
import type { ZodError } from 'zod';

import AppError from '../utils/appError';

const handleZodError = (err: ZodError) => {
  const message = `Input validation error. ${err.issues
    .map((issue) => issue.message)
    .join('. ')}`;

  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: Response) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    status,
    message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

const errorController: ErrorRequestHandler = (err, req, res, _next) => {
  if (process.env.NODE_ENV === 'production') {
    if (err.name === 'ZodError') err = handleZodError(err);
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};

export default errorController;
