import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersDatabase } from "./users.database";
import { randomUUID } from "crypto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    private readonly database: UsersDatabase
  ) {}

  async insertUser(email: string, password: string, username: string) {
    let user_id = randomUUID();
    const newUser: User = new User(user_id, email, password, username);
    await this.database.putUser(newUser);
    return newUser;
  }

  async getUserById(user_id: string) {
    const data = await this.database.getUserById(user_id);
    if (data.Item === undefined) throw new NotFoundException();
    return data;
  }
}