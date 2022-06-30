export class Url {
  id: string;
  original: string;
  exp_date: string;
  user_id: number;
  clicks: number;

  constructor(id: string, original: string, exp_date: string, user_id: number, clicks?: number) {
    this.id = id;
    this.original = original;
    this.exp_date = exp_date;
    this.user_id = user_id;
    this.clicks = clicks;
  }
}