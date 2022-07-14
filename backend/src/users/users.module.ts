import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDatabase } from "./users.database";
import { UsersController } from "./users.controller";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersDatabase],
})
export class UsersModule {}