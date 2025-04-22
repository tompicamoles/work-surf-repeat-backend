import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    // Log more detailed information
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    logger.error(`Request headers: ${JSON.stringify(req.headers)}`);

    if (error.stack) {
      logger.error(`Error stack: ${error.stack}`);
    }

    // Include more information in the response during development
    const responseBody = {
      message,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString(),
    };

    if (process.env.NODE_ENV === 'development') {
      responseBody['stack'] = error.stack;
    }

    res.status(status).json(responseBody);
  } catch (error) {
    console.error('Error in error middleware:', error);
    next(error);
  }
};
