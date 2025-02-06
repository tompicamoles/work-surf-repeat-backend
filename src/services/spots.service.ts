import { hash } from 'bcrypt';
import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Spot } from '@/interfaces/spots.interface';
import { Like } from '@/interfaces/likes.interface';

@Service()
export class SpotService {
  public async findAllSpot(): Promise<Spot[]> {
    const { rows } = await pg.query(`
    SELECT spots.*,
               countries.name as country_name,
               countries.code as country_code,
               countries.continent,
               countries.surf_season,
               countries.good_weather_season,
               countries.timezone,
               countries.life_cost
        FROM spots
        LEFT JOIN countries ON spots.country_id = countries.id
    `);
    return rows;
  }

  public async findSpotById(spotId: number): Promise<Spot> {
    const { rows, rowCount } = await pg.query(`
      SELECT spots.*,
             countries.name as country_name,
             countries.code as country_code,
             countries.continent,
             countries.surf_season,
             countries.good_weather_season,
             countries.timezone,
             countries.life_cost
      FROM spots
      LEFT JOIN countries ON spots.country_id = countries.id
      WHERE spots.id = $1
    `, [spotId]);

    if (!rowCount) throw new HttpException(409, "Spot doesn't exist");
    return rows[0];
  }

  public async createSpot(spotData: Partial<Spot>): Promise<Spot> {
    const { name, country_id, image_link, has_coworking, has_coliving, latitude, longitude } = spotData;
    
    const { rows } = await pg.query(`
      INSERT INTO spots (
        name, 
        country_id, 
        image_link, 
        has_coworking, 
        has_coliving, 
        latitude, 
        longitude
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [name, country_id, image_link, has_coworking, has_coliving, latitude, longitude]);

    return rows[0];
  }

  public async getSpotLikes(spotId: number): Promise<Like[]> {
    const { rows } = await pg.query(`
      SELECT * FROM likes WHERE spot_id = $1
    `, [spotId]);
    
    return rows;
  }

  public async addSpotLike(spotId: number, userId: number): Promise<Like> {
    const { rows } = await pg.query(`
      INSERT INTO likes (user_id, spot_id)
      VALUES ($1, $2)
      RETURNING *
    `, [userId, spotId]);

    return rows[0];
  }

  public async deleteSpot(spotId: number): Promise<void> {
    const { rowCount } = await pg.query(`
      DELETE FROM spots
      WHERE id = $1
    `, [spotId]);

    if (!rowCount) throw new HttpException(409, "Spot doesn't exist");
  }

  // public async findUserById(userId: number): Promise<User> {
  //   const { rows, rowCount } = await pg.query(
  //     `
  //   SELECT
  //     *
  //   FROM
  //     users
  //   WHERE
  //     id = $1
  //   `,
  //     [userId],
  //   );
  //   if (!rowCount) throw new HttpException(409, "User doesn't exist");

  //   return rows[0];
  // }

  // public async createUser(userData: User): Promise<User> {
  //   const { email, password } = userData;

  //   const { rows } = await pg.query(
  //     `
  //   SELECT EXISTS(
  //     SELECT
  //       "email"
  //     FROM
  //       users
  //     WHERE
  //       "email" = $1
  //   )`,
  //     [email],
  //   );
  //   if (rows[0].exists) throw new HttpException(409, `This email ${email} already exists`);

  //   const hashedPassword = await hash(password, 10);
  //   const { rows: createUserData } = await pg.query(
  //     `
  //     INSERT INTO
  //       users(
  //         "email",
  //         "password"
  //       )
  //     VALUES ($1, $2)
  //     RETURNING "email", "password"
  //     `,
  //     [email, hashedPassword],
  //   );

  //   return createUserData[0];
  // }

  // public async updateUser(userId: number, userData: User): Promise<User[]> {
  //   const { rows: findUser } = await pg.query(
  //     `
  //     SELECT EXISTS(
  //       SELECT
  //         "id"
  //       FROM
  //         users
  //       WHERE
  //         "id" = $1
  //     )`,
  //     [userId],
  //   );
  //   if (findUser[0].exists) throw new HttpException(409, "User doesn't exist");

  //   const { email, password } = userData;
  //   const hashedPassword = await hash(password, 10);
  //   const { rows: updateUserData } = await pg.query(
  //     `
  //     UPDATE
  //       users
  //     SET
  //       "email" = $2,
  //       "password" = $3
  //     WHERE
  //       "id" = $1
  //     RETURNING "email", "password"
  //   `,
  //     [userId, email, hashedPassword],
  //   );

  //   return updateUserData;
  // }

  // public async deleteUser(userId: number): Promise<User[]> {
  //   const { rows: findUser } = await pg.query(
  //     `
  //     SELECT EXISTS(
  //       SELECT
  //         "id"
  //       FROM
  //         users
  //       WHERE
  //         "id" = $1
  //     )`,
  //     [userId],
  //   );
  //   if (findUser[0].exists) throw new HttpException(409, "User doesn't exist");

  //   const { rows: deleteUserData } = await pg.query(
  //     `
  //     DELETE
  //     FROM
  //       users
  //     WHERE
  //       id = $1
  //     RETURNING "email", "password"
  //     `,
  //     [userId],
  //   );

  //   return deleteUserData;
  // }
}
