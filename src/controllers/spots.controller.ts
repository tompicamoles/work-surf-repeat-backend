import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { SpotService } from '@services/spots.service';
import { Spot, SpotLike } from '@interfaces/spots.interface';
import { RequestWithUser } from '@interfaces/auth.interface';

export class SpotController {
  public spot = Container.get(SpotService);

  public getSpots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSpotsData: Spot[] = await this.spot.findAllSpot();
      res.status(200).json({ data: findAllSpotsData, message: 'findAll' });
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

  public createSpot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const spotData: Spot = req.body;
      const createSpotData: Spot = await this.spot.createSpot(spotData);
      res.status(201).json({ data: createSpotData, message: 'created' });
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
      console.log('userId lol', userId);
      const createLikeData: SpotLike = await this.spot.addSpotLike(spotId, userId);
      res.status(201).json({ data: createLikeData, message: 'created' });
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

  // public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const findOneUserData: User = await this.user.findUserById(userId);

  //     res.status(200).json({ data: findOneUserData, message: 'findOne' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userData: User = req.body;
  //     const createUserData: User = await this.user.createUser(userData);

  //     res.status(201).json({ data: createUserData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const userData: User = req.body;
  //     const updateUserData: User[] = await this.user.updateUser(userId, userData);

  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const deleteUserData: User[] = await this.user.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
