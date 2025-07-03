import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { SUPABASE_JWT_SECRET } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';

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

export const AuthMiddleware = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      try {
        // Add more detailed error handling for verification
        const decoded = verify(Authorization, SUPABASE_JWT_SECRET) as any;
        const user: User = {
          id: decoded.sub,
          email: decoded.email,
          nickname: decoded.user_metadata.full_name || 'Anonymous',
        };

        const { rows, rowCount } = await pg.query(
          `
          SELECT
            id
          FROM
            auth.users
          WHERE
            id = $1
          `,
          [user.id],
        );

        if (rowCount > 0) {
          req.user = { ...rows[0], ...user };
          next();
        } else {
          next(new HttpException(401, 'User not found'));
        }
      } catch (verifyError) {
        next(new HttpException(401, 'Invalid authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Authentication failed'));
  }
};
