import { cleanEnv, port, str, num } from 'envalid';

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    API_KEY: str(),
    SECRET_KEY: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_DB: str(),
    ORIGIN: str(),
    // Rate limiting environment variables
    GLOBAL_RATE_LIMIT_WINDOW_MS: num({ default: 900000 }), // 15 minutes in milliseconds
    GLOBAL_RATE_LIMIT_MAX: num({ default: 100 }),
    AUTH_RATE_LIMIT_WINDOW_MS: num({ default: 3600000 }), // 1 hour in milliseconds
    AUTH_RATE_LIMIT_MAX: num({ default: 10 }),
  });
};
