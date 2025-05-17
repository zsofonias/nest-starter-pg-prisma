import * as redisStore from 'cache-manager-redis-store';

import { CacheModule as NestCachModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import cacheConfig from 'src/config/cache.config';

@Module({
  imports: [
    NestCachModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const username = config.get('cache.username');
        const password = config.get('cache.password');
        return {
          store: redisStore,
          host: config.get('cache.host'),
          port: config.get('cache.port'),
          ttl: config.get('cache.ttl'),
          ...(username && { username }),
          ...(password && { password }),
        };
      },

      // imports: [ConfigModule.forFeature(cacheConfig)],
      // inject: [cacheConfig.KEY],
      // useFactory: async (config: ConfigType<typeof cacheConfig>) => {
      //   const username = config.username;
      //   const password = config.password;
      //   return {
      //     store: redisStore,
      //     host: config.host,
      //     port: config.port,
      //     ttl: config.ttl,
      //     ...(username && { username }),
      //     ...(password && { password }),
      //   };
      // },
    }),
  ],
  exports: [NestCachModule],
})
export class CacheModule {}
