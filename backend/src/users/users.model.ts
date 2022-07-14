export class User {
  user_id: string;
  email: string;
  password: string;
  username: string;

  constructor(user_id: string, email: string, password: string, username: string) {
    this.user_id = user_id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}