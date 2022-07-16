export class UserModel {
  public username: string;
  public email: string;
  private password?: string;
  private userId?: string;

  constructor(username: string, email: string, password?: string, userId?: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.userId = userId;
  }
}
