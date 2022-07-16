import {CacheModule, Module} from '@nestjs/common';
import { UrlsController } from "./urls.controller";
import { UrlsService } from "./urls.service";
import { UrlsDatabase } from "./urls.database";
import * as redisStore from 'cache-manager-redis-store'

@Module({
  imports:[CacheModule.register({
    ttl: 60*60*24*7, //TODO: cambiar
    isGlobal: true,
    store: redisStore,
    socket:{
      host:'localhost',
      port: 6379
    }
  })],
  controllers: [UrlsController],
  providers: [UrlsService, UrlsDatabase],
})
export class UrlsModule {}