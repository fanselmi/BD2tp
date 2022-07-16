import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from "@nestjs/common";
import { Url } from "./urls.model";
import { UrlsDatabase } from "./urls.database";
import { Cache } from 'cache-manager';

const ID_LENGTH: number = 5;

@Injectable()
export class UrlsService {
  constructor(
    private readonly database: UrlsDatabase,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async insertUrl(original: string, userId?: string, id?: string, expDate?: string) {
    let data;
    if (userId === undefined) userId = 'Anonymous';
    if (id === undefined) {
      do {
        id = require("randomstring").generate(ID_LENGTH);
        data = await this.database.getUrlById(id);
      } while(data.Count !== 0);
    } else {
      data = await this.database.getUrlById(id);
      if (data.Count !== 0) throw new BadRequestException();
    }
    if (expDate === undefined) {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      expDate = today.toDateString();
    } else {
      const today = new Date();
      today.setFullYear(today.getFullYear() - 4);
      if (new Date(expDate) < today) throw new BadRequestException();
    }
    const newUrl: Url = new Url(id, original, Math.floor(new Date(expDate).getTime()/1000), userId, 0);
    await this.database.putUrl(newUrl);
    return newUrl;
  }

  async updateUrl(id: string, userId: string, original: string, expDate: string, clicks: number) {
    const url = new Url(id, original, Math.floor(new Date(expDate).getTime()/1000), userId, clicks);
    await this.database.putUrl(url);
    return url;
  }

  async getUrlById(id: string) {
      const cachedItem = await this.cacheManager.get(id);
      if(cachedItem){
        console.log("cache :)");
        this.getUrlMap(id);
        return cachedItem;
      }
      console.log("no cache");
      const urlMap = await this.getUrlMap(id);
      return urlMap.get("original");
  }

  async getUrlMap(id){
    const urlMap = await this.checkValidUrl(id);
    this.cacheManager.set(id, urlMap.get("original"));
    this.database.putUrl(new Url(id, urlMap.get("original"), urlMap.get("exp_date"), urlMap.get("user_id"), urlMap.get("clicks") + 1));
    return urlMap;
  }

  async getUrlsByUser(userId) {
    const data = await this.database.getUrlsByUser(userId);

  async getUrlByUser(userId, id) {
    return await this.database.getUrlByUser(userId, id);
  }
    return data.Items;
  }

  async deleteUrl(userId: string, id: string) {
    return await this.database.deleteUrl(userId, id);
  }

  private async checkValidUrl(id: string) {
    if (id.length !== ID_LENGTH) throw new BadRequestException();
    const data = await this.database.getUrlById(id);
    if (data.Count === 0) throw new NotFoundException();
    const urlMap = new Map<string, any>();
    Object.entries(data.Items[0]).forEach(([key, value]) => {urlMap.set(key, value)});
    return urlMap;
  }
}