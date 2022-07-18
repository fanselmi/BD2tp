import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  BadRequestException,
  InternalServerErrorException, NotFoundException, Query, UseInterceptors, CacheInterceptor, UseGuards, Request
} from "@nestjs/common";
import { UrlsService } from "./urls.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AuthService } from "../auth/auth.service";

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService,
              private authService: AuthService) {}

  @Post()
  async insertUrl(@Body('original') original: string, @Body('id') id?: string, @Body('expDate') expDate?: string) {
    return await this.urlsService.insertUrl(original, undefined, id, expDate);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async insertUserUrl(@Body('original') original: string, @Request() req, @Body('id') id?: string, @Body('expDate') expDate?: string) {
    return await this.urlsService.insertUrl(original, req.user.userId, id, expDate);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUrl(@Param('id') id: string, @Request() req, @Body('original') original: string, @Body('expDate') expDate: string) {
    const clicks = await this.authService.urlBelongs(req.user.userId, id);
    return await this.urlsService.updateUrl(id, req.user.userId, original, expDate, clicks);
  }

  @Get(':id')
  async geUrlById(@Param('id') id: string) {
    return await this.urlsService.getUrlById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUrlsByUser(@Request() req) {
    return await this.urlsService.getUrlsByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUrl(@Param('id') id: string, @Request() req) {
    await this.authService.urlBelongs(req.user.userId, id);
    return await this.urlsService.deleteUrl(req.user.userId, id);
  }
}