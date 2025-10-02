import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './common/env.config';
import { PrismaService } from './database/prisma.service';
import { CacheModule as NestCache } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: envConfig }),
    NestCache.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({ url: process.env.REDIS_URL }),
        ttl: 120
      })
    })
  ],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}