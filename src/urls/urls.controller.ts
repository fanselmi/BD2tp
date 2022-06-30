import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UrlsService } from "./urls.service";

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  getAllUrls() {
    return this.urlsService.getUrls();
  }

  @Get(':id')
  geUrlById(@Param('id') id: string) {
    return this.urlsService.getUrlById(id);
  }

  @Post()
  insertUrl(@Body('original') original: string, @Body('user_id') user_id: number, @Body('id') id?: string, @Body('exp_date') exp_date?: string) {
    return  {
      id: this.urlsService.insertUrl(original, user_id, id, exp_date),
    };
  }

  @Put(':id')
  updateUrl(@Param('id') id: string, @Body('original') original: string, @Body('user_id') user_id: number, @Body('exp_date') exp_date?: string) {
    return this.urlsService.updateUrl(original, user_id, id, exp_date);
  }
}