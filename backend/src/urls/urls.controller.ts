import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  BadRequestException,
  InternalServerErrorException, NotFoundException
} from "@nestjs/common";
import { UrlsService } from "./urls.service";

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async insertUrl(@Body('original') original: string, @Body('user_id') user_id: string, @Body('id') id?: string, @Body('exp_date') exp_date?: string) {
    try {
      return await this.urlsService.insertUrl(original, user_id, id, exp_date);
    } catch (e) {
      if (e instanceof BadRequestException) throw new BadRequestException();
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  async updateUrl(@Param('id') id: string, @Body('original') original: string, @Body('exp_date') exp_date: string) {
    try {
      return await this.urlsService.updateUrl(original, id, exp_date);
    } catch (e) {
      if (e instanceof BadRequestException) throw new BadRequestException()
      else if (e instanceof NotFoundException) throw new NotFoundException()
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async geUrlById(@Param('id') id: string) {
    try {
      return await this.urlsService.getUrlById(id);
    } catch (e) {
      if (e instanceof BadRequestException) throw new BadRequestException()
      else if (e instanceof NotFoundException) throw new NotFoundException()
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async getAllUrls() {
    return await this.urlsService.getUrls();
  }

  @Delete(':id')
  async deleteUrl(@Param('id') id: string) {
    return await this.urlsService.deleteUrl(id);
  }
}