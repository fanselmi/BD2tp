import { Module } from '@nestjs/common';
import { UrlsModule } from "./urls/urls.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UrlsModule, UsersModule, AuthModule],
})
export class AppModule {}
