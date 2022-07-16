export class Url {
  id: string;
  original: string;
  exp_date: number;
  user_id: string;
  clicks: number;

  constructor(id: string, original: string, exp_date: number, user_id: string, clicks: number) {
    this.id = id;
    this.original = original;
    this.exp_date = exp_date;
    this.user_id = user_id;
    this.clicks = clicks;
  }
}