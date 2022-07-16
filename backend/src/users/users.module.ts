import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDatabase } from "./users.database";
import { UsersController } from "./users.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersDatabase],
  exports: [UsersService]
})
export class UsersModule {}