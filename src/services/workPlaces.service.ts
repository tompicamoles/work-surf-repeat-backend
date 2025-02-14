import { WorkPlace, WorkPlaceRating } from '@interfaces/workPlaces.interface';
import { CreateWorkPlaceDto, CreateWorkPlaceRatingDto } from '@/dtos/workPlaces.dto';
import { HttpException } from '@exceptions/httpException';
import pg from '@database';

export class WorkPlacesService {
  public async findAllWorkPlaces(): Promise<WorkPlace[]> {
    const { rows } = await pg.query(`SELECT 
        work_places.*,
        AVG(ratings.rating) as rating
      FROM 
        work_places
      LEFT JOIN 
        ratings ON work_places.id = ratings.work_place_id
      GROUP BY 
        work_places.id`);
    return rows;
  }

  public async findWorkPlaceById(workPlaceId: number): Promise<WorkPlace> {
    const { rows } = await pg.query(
      `
      SELECT 
        work_places.*,
        AVG(ratings.rating) as rating
      FROM 
        work_places
      LEFT JOIN 
        ratings ON work_places.id = ratings.work_place_id
      WHERE work_places.id = $1
      GROUP BY work_places.id`,
      [workPlaceId],
    );
    if (!rows.length) throw new HttpException(404, "WorkPlace doesn't exist");

    return rows[0];
  }

  public async findWorkPlacesBySpotId(spotId: number): Promise<WorkPlace[]> {
    const { rows } = await pg.query(
      `
      SELECT 
        work_places.*,
        AVG(ratings.rating) as rating
      FROM 
        work_places
      LEFT JOIN 
        ratings ON work_places.id = ratings.work_place_id
      WHERE work_places.spot_id = $1
      GROUP BY work_places.id`,
      [spotId],
    );
    return rows;
  }

  public async createWorkPlace(workPlaceData: CreateWorkPlaceDto): Promise<WorkPlace> {
    const { rows } = await pg.query(
      `INSERT INTO work_places 
      (name, type, spot_id, creator_user_id, adress, image_link, latitude, longitude, rating)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        workPlaceData.name,
        workPlaceData.type,
        workPlaceData.spot_id,
        workPlaceData.creator_user_id,
        workPlaceData.adress,
        workPlaceData.image_link,
        workPlaceData.latitude,
        workPlaceData.longitude,
        workPlaceData.rating,
      ],
    );

    return rows[0];
  }

  public async deleteWorkPlace(workPlaceId: number): Promise<WorkPlace> {
    const { rows } = await pg.query('DELETE FROM work_places WHERE id = $1 RETURNING *', [workPlaceId]);
    if (!rows.length) throw new HttpException(404, "WorkPlace doesn't exist");

    return rows[0];
  }

  public async findWorkPlaceRatings(workPlaceId: number): Promise<WorkPlaceRating[]> {
    const { rows } = await pg.query('SELECT * FROM ratings WHERE work_place_id = $1', [workPlaceId]);
    return rows;
  }

  public async createWorkPlaceRating(workPlaceId: number, userId: number, workPlaceRatingData: CreateWorkPlaceRatingDto): Promise<WorkPlaceRating> {
    const { rows } = await pg.query('INSERT INTO ratings (work_place_id, user_id, rating) VALUES ($1, $2, $3) RETURNING *', [
      workPlaceId,
      userId,
      workPlaceRatingData.rating,
    ]);
    return rows[0];
  }

  public async updateWorkPlaceRating(workPlaceId: number, userId: number, workPlaceRatingData: CreateWorkPlaceRatingDto): Promise<WorkPlaceRating> {
    const { rows } = await pg.query('UPDATE ratings SET rating = $1 WHERE work_place_id = $2 AND user_id = $3 RETURNING *', [
      workPlaceRatingData.rating,
      workPlaceId,
      userId,
    ]);
    return rows[0];
  }

  public async deleteWorkPlaceRating(workPlaceId: number, userId: number): Promise<WorkPlaceRating> {
    const { rows } = await pg.query('DELETE FROM ratings WHERE work_place_id = $1 AND user_id = $2 RETURNING *', [workPlaceId, userId]);
    return rows[0];
  }
}
