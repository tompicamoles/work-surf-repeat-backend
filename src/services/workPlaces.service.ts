import { WorkPlaceInterface, WorkPlaceRatingInterface } from '@interfaces/workPlaces.interface';
import { CreateWorkPlaceRatingDto } from '@/dtos/workPlaces.dto';
import { HttpException } from '@exceptions/httpException';
import pg from '@database';
import { CreateWorkPlaceData } from '@interfaces/workPlaces.interface';

export class WorkPlacesService {
  public async findAllWorkPlaces(): Promise<WorkPlaceInterface[]> {
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

  public async findWorkPlaceById(workPlaceId: number): Promise<WorkPlaceInterface> {
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

  public async findWorkPlacesBySpotId(spotId: number): Promise<WorkPlaceInterface[]> {
    const { rows } = await pg.query(
      `
      SELECT 
        work_places.*,
        ROUND(AVG(ratings.rating)::numeric, 1) as average_rating,
        COUNT(ratings.rating) as total_ratings,
        CASE 
          WHEN COUNT(ratings.rating) > 0 
          THEN JSON_AGG(
            JSON_BUILD_OBJECT(
              'user_id', ratings.user_id,
              'rating', ratings.rating,
              'comment', ratings.comment,
              'created_at', ratings.created_at
            )
          )
          ELSE '[]'::json
        END as ratings
      FROM 
        work_places
      LEFT JOIN 
        ratings ON work_places.id = ratings.work_place_id
      WHERE work_places.spot_id = $1
      GROUP BY work_places.id
      ORDER BY work_places.name`,
      [spotId],
    );
    return rows;
  }

  public async createWorkPlace(workPlaceData: CreateWorkPlaceData): Promise<Partial<WorkPlaceInterface>> {
    const { rows } = await pg.query(
      `INSERT INTO work_places 
      (id, name, type, spot_id, submitted_by, creator_name, adress, image_link, latitude, longitude)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        workPlaceData.id,
        workPlaceData.name,
        workPlaceData.type,
        workPlaceData.spot_id,
        workPlaceData.submitted_by,
        workPlaceData.creator_name,
        workPlaceData.adress,
        workPlaceData.image_link,
        workPlaceData.latitude,
        workPlaceData.longitude,
      ],
    );

    return rows[0];
  }

  public async deleteWorkPlace(workPlaceId: number): Promise<WorkPlaceInterface> {
    const { rows } = await pg.query('DELETE FROM work_places WHERE id = $1 RETURNING *', [workPlaceId]);
    if (!rows.length) throw new HttpException(404, "WorkPlace doesn't exist");

    return rows[0];
  }

  public async findWorkPlaceRatings(workPlaceId: number): Promise<WorkPlaceRatingInterface[]> {
    const { rows } = await pg.query('SELECT * FROM ratings WHERE work_place_id = $1', [workPlaceId]);
    return rows;
  }

  public async createWorkPlaceRating(
    workPlaceId: string,
    userId: number,
    rating: number,
    comment: string,
    createdAt: string,
  ): Promise<WorkPlaceRatingInterface> {
    const { rows } = await pg.query(
      'INSERT INTO ratings (work_place_id, user_id, rating, comment, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [workPlaceId, userId, rating, comment, createdAt],
    );
    return rows[0];
  }

  public async updateWorkPlaceRating(
    workPlaceId: string,
    userId: number,
    rating: number,
    comment: string,
    createdAt: string,
  ): Promise<WorkPlaceRatingInterface> {
    const { rows } = await pg.query(
      'UPDATE ratings SET rating = $1, comment = $2, created_at = $3 WHERE work_place_id = $4 AND user_id = $5 RETURNING *',
      [rating, comment, createdAt, workPlaceId, userId],
    );
    return rows[0];
  }

  public async deleteWorkPlaceRating(workPlaceId: number, userId: number): Promise<WorkPlaceRatingInterface> {
    const { rows } = await pg.query('DELETE FROM ratings WHERE work_place_id = $1 AND user_id = $2 RETURNING *', [workPlaceId, userId]);
    return rows[0];
  }
}
