import { NextFunction, Request, Response } from 'express';
import { WorkPlacesService } from '@services/workPlaces.service';
import { CreateWorkPlaceRatingDto } from '@/dtos/workPlaces.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { WorkPlaceInterface, CreateWorkPlaceData } from '@interfaces/workPlaces.interface';

export class WorkPlacesController {
  public workPlaceService = new WorkPlacesService();

  public getWorkPlaces = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllWorkPlacesData = await this.workPlaceService.findAllWorkPlaces();
      res.status(200).json({ data: findAllWorkPlacesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getWorkPlaceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workPlaceId = Number(req.params.id);
      const findOneWorkPlaceData = await this.workPlaceService.findWorkPlaceById(workPlaceId);
      res.status(200).json({ data: findOneWorkPlaceData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getWorkPlacesBySpotId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const spotId = Number(req.params.id);
      console.log(spotId);
      const findWorkPlacesData = await this.workPlaceService.findWorkPlacesBySpotId(spotId);
      res.status(200).json(findWorkPlacesData);
    } catch (error) {
      next(error);
    }
  };

  public createWorkPlace = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id, name } = req.user;
      const workPlaceData: CreateWorkPlaceData = {
        ...req.body,
        submitted_by: id,
        creator_name: name,
      };
      console.log('workPlaceData', workPlaceData);
      const createWorkPlaceData: WorkPlaceInterface = await this.workPlaceService.createWorkPlace(workPlaceData);

      const rating = req.body.rating;

      if (rating) {
        await this.workPlaceService.createWorkPlaceRating(createWorkPlaceData.id, id, rating);
      }
      res.status(201).json(createWorkPlaceData);
    } catch (error) {
      next(error);
    }
  };

  public deleteWorkPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workPlaceId = Number(req.params.id);
      const deleteWorkPlaceData = await this.workPlaceService.deleteWorkPlace(workPlaceId);
      res.status(200).json({ data: deleteWorkPlaceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getWorkPlaceRatings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workPlaceId = Number(req.params.id);
      const findWorkPlaceRatingsData = await this.workPlaceService.findWorkPlaceRatings(workPlaceId);
      res.status(200).json({ data: findWorkPlaceRatingsData, message: 'findByWorkPlaceId' });
    } catch (error) {
      next(error);
    }
  };

  public createWorkPlaceRating = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const workPlaceId = Number(req.params.id);
      const rating = req.body.rating;
      const userId = req.user.id;
      const createWorkPlaceRatingData = await this.workPlaceService.createWorkPlaceRating(workPlaceId, userId, rating);
      res.status(201).json({ data: createWorkPlaceRatingData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateWorkPlaceRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workPlaceId = Number(req.params.id);
      const workPlaceRatingId = Number(req.params.ratingId);
      const workPlaceRatingData: CreateWorkPlaceRatingDto = req.body;
      const updateWorkPlaceRatingData = await this.workPlaceService.updateWorkPlaceRating(workPlaceId, workPlaceRatingId, workPlaceRatingData);
      res.status(200).json({ data: updateWorkPlaceRatingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteWorkPlaceRating = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const workPlaceId = Number(req.params.id);
      const userId = req.user.id;
      const deleteWorkPlaceRatingData = await this.workPlaceService.deleteWorkPlaceRating(workPlaceId, userId);
      res.status(200).json({ data: deleteWorkPlaceRatingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
