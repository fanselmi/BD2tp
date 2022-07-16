export class Url {
  id: string;
  original: string;
  expDate: number;
  userId: string;
  clicks: number;

  constructor(id: string, original: string, expDate: number, userId: string, clicks: number) {
    this.id = id;
    this.original = original;
    this.expDate = expDate;
    this.userId = userId;
    this.clicks = clicks;
  }
}