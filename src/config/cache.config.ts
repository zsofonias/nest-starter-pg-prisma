import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  ttl: parseInt(process.env.REDIS_TTL || '10', 10),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
}));
