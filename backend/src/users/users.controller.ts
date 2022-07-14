import {
  BadRequestException,
  Body,
  Controller, Delete, Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put, Res
} from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async insertUser(@Body('email') email: string, @Body('password') password: string, @Body('username') username: string) {
    return await this.usersService.insertUser(email, password, username);
  }

  @Get(':user_id')
  async geUserById(@Param('user_id') user_id: string) {
    try {
      return await this.usersService.getUserById(user_id);
    } catch (e) {
      if (e instanceof NotFoundException) throw new NotFoundException()
      throw new InternalServerErrorException(e.message);
    }
  }
}