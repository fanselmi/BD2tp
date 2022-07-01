import { BadRequestException, Injectable } from "@nestjs/common";
import { Url } from "./urls.model";
import putUrl from "../db/urls/putUrl";
import getUrls from "../db/urls/getUrls";
import getUrlById from "../db/urls/getUrlById";
import deleteUrl from "../db/urls/deleteUrl";

@Injectable()
export class UrlsService {
  async insertUrl(original: string, user_id: number, id?: string, exp_date?: string) {
    let count: number;
    if (id === undefined) {
      do {
        id = require("randomstring").generate(5);
        count = await this.getUrlById(id).then((data) => { return data.Count});
      } while(count !== 0);
    } else {
      count = await this.getUrlById(id).then((data) => { return data.Count});
      if (count !== 0) throw new BadRequestException();
    }
    if (exp_date === undefined) {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      exp_date = today.toDateString();
    }
    const newUrl = new Url(id, original, exp_date, user_id);
    putUrl(newUrl);
    return id;
  }

  updateUrl(original: string, user_id: number, id: string, exp_date?: string) {
    const newUrl = new Url(id, original, exp_date, user_id);
    putUrl(newUrl);
    return newUrl;
  }

  getUrls() {
    return getUrls();
  }

  getUrlById(id: string) {
    return getUrlById(id);
  }

  deleteUrl(id: string) {
    return deleteUrl(1, id); //TODO sacar el hardcodeado
  }
}