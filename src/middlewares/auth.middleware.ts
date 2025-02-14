import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const getAuthorization = req => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized - Invalid API Key' });
  }

  next();
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const { rows, rowCount } = await pg.query(
        `
        SELECT
          "email",
          "password"
        FROM
          users
        WHERE
          "id" = $1
      `,
        [id],
      );

      if (rowCount) {
        req.user = rows[0];
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
