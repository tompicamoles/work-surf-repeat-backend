import { Router } from 'express';
import { SpotController } from '@controllers/spots.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateSpotDto } from '@dtos/spots.dto';
import { CreateLikeDto } from '@dtos/likes.dto';
export class SpotRoute implements Routes {
  public path = '/spots';
  public router = Router();
  public spot = new SpotController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.spot.getSpots);
    this.router.get(`${this.path}/:id(\\d+)`, this.spot.getSpotById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateSpotDto), this.spot.createSpot);
    //this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateSpotDto, true), this.spot.updateSpot);
    this.router.post(`${this.path}/:id(\\d+)/like`, ValidationMiddleware(CreateLikeDto), this.spot.addSpotLike);
    this.router.get(`${this.path}/:id(\\d+)/likes`, this.spot.getSpotLikes);
    this.router.delete(`${this.path}/:id(\\d+)`, this.spot.deleteSpot);
  }
}
