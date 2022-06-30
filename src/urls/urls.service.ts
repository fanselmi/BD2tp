import { Injectable } from '@nestjs/common';
import { Url } from "./urls.model";
import putUrl from "../db/urls/putUrl";
import getUrls from "../db/urls/getUrls";
import getUrlById from "../db/urls/getUrlById";

@Injectable()
export class UrlsService {
  insertUrl(original: string, user_id: number, id?: string, exp_date?: string) {
    if (id === undefined) {
      id = require("randomstring").generate(5);
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
}