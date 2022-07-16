import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { UrlsModule } from "../urls/urls.module";

@Module({
  imports: [forwardRef(() => UsersModule),
    forwardRef(() => UrlsModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
