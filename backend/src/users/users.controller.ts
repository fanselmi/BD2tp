import {
  Body,
  Controller, Get,
  Post,
  UseGuards, Request
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { AuthService } from "../auth/auth.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private authService: AuthService) {}

  @Post()
  async insertUser(@Body('email') email: string, @Body('password') password: string, @Body('username') username: string) {
    return await this.usersService.insertUser(email, password, username);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return req.user;
  }
}