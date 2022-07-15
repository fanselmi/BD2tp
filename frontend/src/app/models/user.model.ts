export class UserModel {
  public username: string;
  public email: string;
  private password?: string;
  private user_id?: string;

  constructor(username: string, email: string, password?: string, user_id?: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.user_id = user_id;
  }
}
