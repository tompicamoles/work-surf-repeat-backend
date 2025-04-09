import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { SpotRoute } from '@routes/spots.route';
import { WorkPlacesRoute } from '@routes/workPlaces.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new SpotRoute(), new WorkPlacesRoute()]);

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error: Error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});

app.listen();
