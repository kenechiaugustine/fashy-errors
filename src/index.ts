import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'failed';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const sendError: ErrorRequestHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: err.status,
    message: 'Something went very wrong!!!',
  });
};

export const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}.`;
    error = new CustomError(message, 400);
  }

  if (err.code === 11000) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    error = new CustomError(message, 400);
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    error = new CustomError(message, 400);
  }

  if (err.type === 'entity.parse.failed') {
    error = new CustomError('Invalid JSON data', 400);
  }

  if (err.name === 'MulterError') {
    const message = err.message + ': ' + err.field;
    error = new CustomError(message, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    error = new CustomError('Invalid token.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new CustomError('Your token has expired!', 401);
  }

  if (err.code === 'ENOENT' && err.errno === -2) {
    const message = `File uploading error: ${err.message}`;
    error = new CustomError(message, 401);
  }

  sendError(error, req, res, next);
};
