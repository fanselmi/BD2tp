export class UrlModel {
  public original: string;
  public id?: string;
  public expDate?: number;
  public userId?: string;
  public clicks?: number;


  constructor(original: string, userId?: string, id?: string, expDate?: number) {
    this.original = original;
    this.id = id;
    this.expDate = expDate;
    this.userId = userId;
  }
}
