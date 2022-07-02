import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException
} from "@nestjs/common";
import { UrlsService } from "./urls.service";
import { NotFoundInterceptor } from "./notFoundInterceptor";

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  getAllUrls() {
    return this.urlsService.getUrls();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  geUrlById(@Param('id') id: string) {
    return this.urlsService.getUrlById(id);
  }

  @Post()
  async insertUrl(@Body('original') original: string, @Body('user_id') user_id: number, @Body('id') id?: string, @Body('exp_date') exp_date?: string) {
    try {
      return {
        id: await this.urlsService.insertUrl(original, user_id, id, exp_date),
      };
    } catch (e) {
      if (e instanceof BadRequestException) throw new BadRequestException();
      throw new InternalServerErrorException();
    }
  }

  @Put(':id')
  updateUrl(@Param('id') id: string, @Body('original') original: string, @Body('user_id') user_id: number, @Body('exp_date') exp_date?: string) {
    return this.urlsService.updateUrl(original, user_id, id, exp_date);
  }

  @Delete(':id')
  deleteUrl(@Param('id') id: string) {
    return this.urlsService.deleteUrl(id);
  }
}