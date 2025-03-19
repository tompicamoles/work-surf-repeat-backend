import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { SpotService } from '@services/spots.service';
import { Spot, SpotLike } from '@interfaces/spots.interface';
import { RequestWithUser } from '@interfaces/auth.interface';

export class SpotController {
  public spot = Container.get(SpotService);

  public getSpots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //filters
    console.log(req.query, 'req.query');
    const {
      lifeCost,
      country,
      wifiQuality,
      hasCoworking,
      hasColiving,
    }: {
      lifeCost?: number;
      country?: string;
      wifiQuality?: number;
      hasCoworking?: boolean;
      hasColiving?: boolean;
    } = req.query;

    console.log(lifeCost, 'lifeCost');
    console.log(req.body, 'req.body');
    try {
      const findAllSpotsData: Spot[] = await this.spot.findAllSpot({
        lifeCost,
        country,
        wifiQuality,
        hasCoworking,
        hasColiving,
      });
      res.status(200).json(findAllSpotsData);
    } catch (error) {
      next(error);
    }
  };

  public getSpotById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const spotId = Number(req.params.id);
      const findOneSpotData: Spot = await this.spot.findSpotById(spotId);
      res.status(200).json({ data: findOneSpotData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSpot = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userName = req.user.name;
      console.log('userName', userName, 'req.user', req.user);
      const spotData: Spot = { ...req.body, submitted_by: userName };
      console.log('spotData', spotData);
      const createSpotData: Spot = await this.spot.createSpot(spotData);
      res.status(201).json(createSpotData);
    } catch (error) {
      next(error);
    }
  };

  public deleteSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const spotId = Number(req.params.id);
      await this.spot.deleteSpot(spotId);
      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public addSpotLike = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const spotId = Number(req.params.id);
      const userId = req.user.id;

      const userAlreadyLiked = await this.spot.getSpotLike(userId, spotId);
      if (userAlreadyLiked) {
        await this.spot.deleteSpotLike(spotId, userId);
        res.status(200).json({ message: 'like deleted', userId, spotId });
      } else {
        await this.spot.addSpotLike(spotId, userId);
        res.status(201).json({ message: 'like created', userId, spotId });
      }
    } catch (error) {
      next(error);
    }
  };

  public getSpotLikes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const spotId = Number(req.params.id);
      const findAllLikesData: SpotLike[] = await this.spot.findAllSpotLikes(spotId);
      res.status(200).json({ data: findAllLikesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
