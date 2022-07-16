export class User {
  userId: string;
  email: string;
  password: string;
  username: string;

  constructor(userId: string, email: string, password: string, username: string) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}