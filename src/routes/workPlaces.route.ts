import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateWorkPlaceDto, CreateWorkPlaceRatingDto, UpdateWorkPlaceRatingDto } from '@/dtos/workPlaces.dto';
import { WorkPlacesController } from '@controllers/workPlaces.controller';
import { AuthMiddleware } from '@middlewares/auth.middleware';
export class WorkPlacesRoute implements Routes {
  public path = '/workplaces';
  public router = Router();
  public workPlace = new WorkPlacesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.workPlace.getWorkPlaces);
    this.router.get(`${this.path}/:id`, this.workPlace.getWorkPlaceById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateWorkPlaceDto), this.workPlace.createWorkPlace);
    this.router.delete(`${this.path}/:id`, this.workPlace.deleteWorkPlace);
    this.router.get(`${this.path}/:id/ratings`, this.workPlace.getWorkPlaceRatings);
    this.router.post(
      `${this.path}/:id/ratings`,
      ValidationMiddleware(CreateWorkPlaceRatingDto),
      AuthMiddleware,
      this.workPlace.createWorkPlaceRating,
    );
    this.router.put(`${this.path}/:id/ratings`, ValidationMiddleware(UpdateWorkPlaceRatingDto), AuthMiddleware, this.workPlace.updateWorkPlaceRating);
    this.router.delete(`${this.path}/:id/ratings`, this.workPlace.deleteWorkPlaceRating);
  }
}
