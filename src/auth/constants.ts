import * as dotenv from 'dotenv';

dotenv.config();
export const jwtConstants = {
  secret: process.env.JWT_ACCESS_SECRET,
  secretExpiration: +process.env.JWT_ACCESS_SECRET_EXPIRATION,
};
