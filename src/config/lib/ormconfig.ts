import { config } from 'dotenv';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

config();
const databaseUrl: string = process.env.DATABASE_URL;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);
const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: connectionOptions.host,
  port: +connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: false,
  logging: process.env.NODE_ENV === 'production' ? false : true,
  entities: ['dist/src/models/**/*.entity.js'],
  migrations: ['dist/src/db/migration/**/*.js'],
  subscribers: ['dist/src/db/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default ormConfig;
