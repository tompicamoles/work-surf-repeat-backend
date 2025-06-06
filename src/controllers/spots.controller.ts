import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { SpotService } from '@services/spots.service';
import { Spot, SpotLike, CreateSpotData } from '@interfaces/spots.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import { geminiSpotModerator } from '@utils/geminiSpotModerator';
import { generateRandomSurfImage } from '@/utils/generateRandomSurfImage';
import { getGeolocation } from '@/utils/getGeolocation';
export class SpotController {
  public spot = Container.get(SpotService);

  public getSpots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //filters
    const {
      lifeCost,
      country,
      wifiQuality,
      hasCoworking,
      hasColiving,
    }: {
      lifeCost?: string;
      country?: string;
      wifiQuality?: string;
      hasCoworking?: string;
      hasColiving?: string;
    } = req.query;

    try {
      const findAllSpotsData: Spot[] = await this.spot.findAllSpot({
        lifeCost: lifeCost ? parseInt(lifeCost) : undefined,
        country,
        wifiQuality: wifiQuality ? parseInt(wifiQuality) : undefined,
        hasCoworking: hasCoworking === 'true' ? true : undefined,
        hasColiving: hasColiving === 'true' ? true : undefined,
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

  public createSpot = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const { name, id } = req.user;
      const spotData: CreateSpotData = {
        ...req.body,
        submitted_by: id,
        creator_name: name,
      };
      const isARealSurfSpot = await geminiSpotModerator(spotData.name, spotData.country);

      if (!isARealSurfSpot) {
        return res.status(400).json({
          success: false,
          message: `Validation failed: ${spotData.name}, ${spotData.country} is not a real surf spot or is not close enough to the ocean for surfing.`,
        });
      }

      if (!spotData.image_link) {
        spotData.image_link = await generateRandomSurfImage('surf');
      }

      const geolocation = await getGeolocation(spotData.name, spotData.country);
      spotData.latitude = geolocation.latitude;
      spotData.longitude = geolocation.longitude;

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
