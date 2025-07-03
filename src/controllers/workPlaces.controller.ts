import { NextFunction, Request, Response } from 'express';
import { WorkPlacesService } from '@services/workPlaces.service';
import { CreateWorkPlaceDto } from '@/dtos/workPlaces.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { WorkPlaceInterface, CreateWorkPlaceData } from '@interfaces/workPlaces.interface';
import { generateRandomSurfImage } from '@/utils/generateRandomSurfImage';

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

  public getWorkPlacesBySpotId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const spotId = Number(req.params.id);
      const findWorkPlacesData: WorkPlaceInterface[] = await this.workPlaceService.findWorkPlacesBySpotId(spotId);
      console.log('findWorkPlacesData', findWorkPlacesData);

      res.status(200).json(findWorkPlacesData);
    } catch (error) {
      next(error);
    }
  };

  public createWorkPlace = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id: userId, nickname: userNickname } = req.user;
      const { id: workPlaceId, name, type, spot_id, adress, image_link, latitude, longitude, rating, comment }: CreateWorkPlaceDto = req.body;

      const workPlaceData: CreateWorkPlaceData = {
        id: workPlaceId,
        name,
        type,
        spot_id,
        adress,
        image_link,
        latitude,
        longitude,
        submitted_by: userId,
        creator_name: userNickname,
      };

      if (!workPlaceData.image_link) {
        workPlaceData.image_link = await generateRandomSurfImage('beach café');
      }

      const createWorkPlaceData = await this.workPlaceService.createWorkPlace(workPlaceData);

      const ratingCreatedAt: string = new Date().toISOString();
      const createRatingData = await this.workPlaceService.createWorkPlaceRating(workPlaceId, userId, userNickname, rating, comment, ratingCreatedAt);

      const workPlaceWithRating: WorkPlaceInterface = {
        id: createWorkPlaceData.id,
        name: createWorkPlaceData.name,
        type: createWorkPlaceData.type,
        spot_id: createWorkPlaceData.spot_id,
        submitted_by: createWorkPlaceData.submitted_by,
        creator_name: createWorkPlaceData.creator_name,
        adress: createWorkPlaceData.adress,
        image_link: createWorkPlaceData.image_link,
        latitude: createWorkPlaceData.latitude,
        longitude: createWorkPlaceData.longitude,
        total_ratings: 1,
        average_rating: rating,
        ratings: [createRatingData],
      };

      res.status(201).json(workPlaceWithRating);
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
      const workPlaceId: string = req.params.id;
      const rating: number = req.body.rating;
      const comment: string = req.body.comment;
      const userId: number = req.user.id;
      const userNickname: string = req.user.nickname;
      const createdAt: string = new Date().toISOString();
      const createWorkPlaceRatingData = await this.workPlaceService.createWorkPlaceRating(
        workPlaceId,
        userId,
        userNickname,
        rating,
        comment,
        createdAt,
      );
      res.status(201).json({ ...createWorkPlaceRatingData });
    } catch (error) {
      next(error);
    }
  };

  public updateWorkPlaceRating = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const workPlaceId: string = req.params.id;
      const rating: number = req.body.rating;
      const comment: string = req.body.comment;
      const userId: number = req.user.id;
      const createdAt: string = new Date().toISOString();
      const updateWorkPlaceRatingData = await this.workPlaceService.updateWorkPlaceRating(workPlaceId, userId, rating, comment, createdAt);
      res.status(200).json({ ...updateWorkPlaceRatingData });
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
