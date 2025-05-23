// import request from 'supertest';
// import { App } from '@/app';
// import pg from '@database';
// import { CreateUserDto } from '@dtos/users.dto';
// import { AuthRoute } from '@routes/auth.route';

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
//   pg.end();
// });

// describe('Testing Auth', () => {
//   describe('[POST] /signup', () => {
//     it('response should have the Create userData', async () => {
//       const userData: CreateUserDto = {
//         email: 'example@email.com',
//         password: 'password',
//       };
//       const authRoute = new AuthRoute();
//       const app = new App([authRoute]);

//       return await request(app.getServer())
//       .post('/signup')
//       .send(userData)
//       .expect(201);
//     });
//   });

//   describe('[POST] /login', () => {
//     it('response should have the Set-Cookie header with the Authorization token', async () => {
//       const userData: CreateUserDto = {
//         email: 'example1@email.com',
//         password: 'password',
//       };

//       const authRoute = new AuthRoute();
//       const app = new App([authRoute]);

//       return await request(app.getServer())
//         .post('/login')
//         .send(userData)
//         .expect('Set-Cookie', /^Authorization=.+/);
//     });
//   });

//   // error: StatusCode : 404, Message : Authentication token missing
//   // describe('[POST] /logout', () => {
//   //   it('logout Set-Cookie Authorization=; Max-age=0', () => {
//   //     const authRoute = new AuthRoute();
//   //     const app = new App([authRoute]);

//   //     return request(app.getServer())
//   //       .post('/logout')
//   //       .expect('Set-Cookie', /^Authorization=\;/);
//   //   });
//   // });
// });
