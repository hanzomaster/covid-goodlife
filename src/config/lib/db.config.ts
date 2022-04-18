import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const dbConfig = registerAs('db', () => ({
  // TODO: Add DB config
}));

export type DbConfig = ConfigType<typeof dbConfig>;
export const InjectDbConfig = () => Inject(dbConfig.KEY);
