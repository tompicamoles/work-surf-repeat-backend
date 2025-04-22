import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, CREDENTIALS } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { apiKeyMiddleware } from '@middlewares/auth.middleware';
import { globalLimiter } from '@middlewares/rateLimit.middleware';
import { specs } from './swagger';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));

    // Log CORS configuration details
    const originStr = process.env.ORIGIN;
    const origins = originStr ? originStr.split(',').map(o => o.trim()) : [];
    console.log('CORS configuration:', {
      origins,
      credentials: CREDENTIALS,
    });

    this.app.use(
      cors({
        origin: origins,
        credentials: CREDENTIALS,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200, // For legacy browser support
      }),
    );

    // Add options handler for preflight requests
    this.app.options(
      '*',
      cors({
        origin: origins,
        credentials: CREDENTIALS,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        optionsSuccessStatus: 200,
      }),
    );

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(globalLimiter);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('', apiKeyMiddleware, route.router);
    });
  }

  private initializeSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
