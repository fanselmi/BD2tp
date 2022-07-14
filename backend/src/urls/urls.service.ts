import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Url } from "./urls.model";
import { UrlsDatabase } from "./urls.database";

const ID_LENGTH: number = 5;

@Injectable()
export class UrlsService {
  constructor(
    private readonly database: UrlsDatabase
  ) {}

  async insertUrl(original: string, user_id: string, id?: string, exp_date?: string) { //TODO ver de sacar el user_id de aca y usar el de token
    let data;
    if (id === undefined) {
      do {
        id = require("randomstring").generate(ID_LENGTH);
        data = await this.database.getUrlById(id);
      } while(data.Count !== 0);
    } else {
      data = await this.database.getUrlById(id);
      if (data.Count !== 0) throw new BadRequestException();
    }
    if (exp_date === undefined) {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      exp_date = today.toDateString();
    }
    const newUrl: Url = new Url(id, original, exp_date, user_id, 0);
    await this.database.putUrl(newUrl);
    return newUrl;
  }

  async updateUrl(original: string, id: string, exp_date: string) { //TODO ver de conseguir el user_id del token para no hacer lo del map
    try {
      const urlMap = await this.checkValidUrl(id);
      const url = new Url(id, original, exp_date, urlMap.get("user_id"), urlMap.get("clicks"));
      await this.database.putUrl(url);
      return url;
    } catch (e) {
      if (e instanceof BadRequestException) throw new BadRequestException()
      else if (e instanceof NotFoundException) throw new NotFoundException()
      throw new InternalServerErrorException();
    }
  }

  async getUrlById(id: string) {
    try {
      const urlMap = await this.checkValidUrl(id);
      await this.database.putUrl(new Url(id, urlMap.get("original"), urlMap.get("exp_date"), urlMap.get("user_id"), urlMap.get("clicks") + 1));
      return urlMap.get("original");
    } catch (e) {
      if (e instanceof BadRequestException) throw new BadRequestException()
      else if (e instanceof NotFoundException) throw new NotFoundException()
      throw new InternalServerErrorException();
    }
  }

  async getUrls(user_id) {
    const data = await this.database.getUrls(user_id);
    return data.Items;
  }

  async deleteUrl(id: string) {
    return await this.database.deleteUrl("test", id); //TODO sacar el hardcodeado
  }

  private async checkValidUrl(id: string) {
    if (id.length !== ID_LENGTH) throw new BadRequestException();
    const data = await this.database.getUrlById(id);
    if (data.Count === 0) throw new NotFoundException();
    const urlMap = new Map<string, any>;
    Object.entries(data.Items[0]).forEach(([key, value]) => {urlMap.set(key, value)});
    return urlMap;
  }
}