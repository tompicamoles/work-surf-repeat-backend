// import request from 'supertest';
// import { App } from '@/app';
// import pg from '@database';
// import { CreateUserDto } from '@dtos/users.dto';
// import { UserRoute } from '@routes/users.route';

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
//   pg.end();
// });

// describe('Testing Users', () => {
//   describe('[GET] /users', () => {
//     it('response statusCode 200 / findAll', async () => {
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return await request(app.getServer()).get(`${usersRoute.path}`).expect(200);
//     });
//   });

//   describe('[GET] /users/:id', () => {
//     it('response statusCode 200 / findOne', async () => {
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return await request(app.getServer())
//         .get(`${usersRoute.path}`)
//         .query({
//           userId: 1,
//         })
//         .expect(200);
//     });
//   });

//   describe('[POST] /users', () => {
//     it('response statusCode 201 / created', async () => {
//       const userData: CreateUserDto = {
//         email: 'example@email.com',
//         password: 'password',
//       };
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return await request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
//     });
//   });

//   describe('[PUT] /users/:id', () => {
//     it('response statusCode 200 / updated', async () => {
//       const userId = 1;
//       const userData: CreateUserDto = {
//         email: 'example@email.com',
//         password: 'password',
//       };
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return await request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
//     });
//   });

//   describe('[DELETE] /users/:id', () => {
//     it('response statusCode 200 / deleted', async () => {
//       const userId = 1;
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return await request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
//     });
//   });
// });
