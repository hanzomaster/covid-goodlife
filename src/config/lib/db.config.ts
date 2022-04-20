import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const dbConfig = registerAs('db', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'goodlife',
  password: process.env.DB_PASSWORD || 'covidgoodlife', // Change password to your own
  database: process.env.DB_DATABASE || 'goodlife',
}));

export type DbConfig = ConfigType<typeof dbConfig>;
export const InjectDbConfig = () => Inject(dbConfig.KEY);
