export class UrlModel {
  public original: string;
  public id?: string;
  public exp_date?: string;
  public user_id: number;
  public clicks?: number;


  constructor(original: string, user_id: number, id?: string, exp_date?: string) {
    this.original = original;
    this.id = id;
    this.exp_date = exp_date;
    this.user_id = user_id;
  }
}
