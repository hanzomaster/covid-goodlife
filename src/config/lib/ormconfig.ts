import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const ormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'goodlife',
  password: process.env.DB_PASSWORD || 'covidgoodlife', // Change password to your own
  database: process.env.DB_DATABASE || 'goodlife',
  entities: ['dist/src/models/**/*.entity.js'],
  migrations: ['dist/src/db/migration/**/*.js'],
  subscribers: ['dist/src/db/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
};

export default ormConfig;
