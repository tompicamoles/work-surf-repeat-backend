import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Spot, SpotLike } from '@/interfaces/spots.interface';

@Service()
export class SpotService {
  public async findAllSpot(filters?: {
    lifeCost?: number;
    country?: string;
    wifiQuality?: number;
    hasCoworking?: boolean;
    hasColiving?: boolean;
  }): Promise<Spot[]> {
    let query = `
      SELECT spots.*,
             countries.name as country_name,
             countries.code as country_code,
             countries.continent,
             countries.surf_season,
             countries.good_weather_season,
             countries.timezone,
             countries.life_cost,
             (SELECT COUNT(*) FROM likes WHERE spot_id = spots.id) as total_likes,
             (SELECT ARRAY_AGG(user_id) FROM likes WHERE spot_id = spots.id) as like_user_ids
      FROM spots
      LEFT JOIN countries ON spots.country = countries.name
    `;

    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (filters) {
      if (filters.lifeCost !== undefined) {
        conditions.push(`countries.life_cost <= $${paramCount}`);
        values.push(filters.lifeCost);
        paramCount++;
      }

      if (filters.country !== undefined) {
        conditions.push(`spots.country = $${paramCount}`);
        values.push(filters.country);
        paramCount++;
      }

      if (filters.wifiQuality !== undefined) {
        conditions.push(`spots.wifi_quality >= $${paramCount}`);
        values.push(filters.wifiQuality);
        paramCount++;
      }

      if (filters.hasCoworking === true) {
        conditions.push(`spots.has_coworking = true`);
      }

      if (filters.hasColiving === true) {
        conditions.push(`spots.has_coliving = true`);
      }

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
    }

    const { rows } = await pg.query(query, values);
    return rows;
  }

  public async findSpotById(spotId: number): Promise<Spot> {
    const { rows, rowCount } = await pg.query(
      `
      SELECT spots.*,
             countries.code as country_code,
             countries.continent,
             countries.surf_season,
             countries.good_weather_season,
             countries.timezone,
             countries.life_cost,
             (SELECT COUNT(*) FROM likes WHERE spot_id = spots.id) as total_likes,
             (SELECT ARRAY_AGG(user_id) FROM likes WHERE spot_id = spots.id) as like_user_ids
      FROM spots
      LEFT JOIN countries ON spots.country = countries.name
      WHERE spots.id = $1
    `,
      [spotId],
    );

    if (!rowCount) throw new HttpException(409, "Spot doesn't exist");
    return rows[0];
  }

  public async createSpot(spotData: Partial<Spot>): Promise<Spot> {
    const { name, country, image_link, has_coworking, has_coliving, latitude, longitude, submitted_by, wifi_quality } = spotData;

    console.log('spotData', spotData);
    const { rows } = await pg.query(
      `
      INSERT INTO spots (
        name, 
        country, 
        image_link, 
        has_coworking, 
        has_coliving, 
        latitude, 
        longitude,
        submitted_by,
        wifi_quality
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `,
      [name, country, image_link, has_coworking, has_coliving, latitude, longitude, submitted_by, wifi_quality],
    );

    return rows[0];
  }

  public async findAllSpotLikes(spotId: number): Promise<SpotLike[]> {
    const { rows } = await pg.query(
      `
      SELECT * FROM likes WHERE spot_id = $1
    `,
      [spotId],
    );

    return rows;
  }

  //get like by user and spot id
  public async getSpotLike(userId: number, spotId: number): Promise<SpotLike> {
    const { rows } = await pg.query(`SELECT * FROM likes WHERE user_id = $1 AND spot_id = $2`, [userId, spotId]);

    return rows[0];
  }

  public async addSpotLike(spotId: number, userId: number): Promise<SpotLike> {
    const { rows } = await pg.query(
      `
      INSERT INTO likes (user_id, spot_id)
      VALUES ($1, $2)
      RETURNING *
    `,
      [userId, spotId],
    );

    return rows[0];
  }

  //delete like
  public async deleteSpotLike(spotId: number, userId: number): Promise<void> {
    const { rowCount } = await pg.query(
      `
      DELETE FROM likes WHERE spot_id = $1 AND user_id = $2
    `,
      [spotId, userId],
    );

    if (!rowCount) throw new HttpException(409, "Like doesn't exist");
  }

  public async deleteSpot(spotId: number): Promise<void> {
    const { rowCount } = await pg.query(
      `
      DELETE FROM spots
      WHERE id = $1
    `,
      [spotId],
    );

    if (!rowCount) throw new HttpException(409, "Spot doesn't exist");
  }
}
