import { Module } from '@nestjs/common';
import { UrlsController } from "./urls.controller";
import { UrlsService } from "./urls.service";
import { UrlsDatabase } from "./urls.database";

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, UrlsDatabase],
})
export class UrlsModule {}