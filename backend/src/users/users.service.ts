import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersDatabase } from "./users.database";
import { randomUUID } from "crypto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    private readonly database: UsersDatabase
  ) {}

  async insertUser(email: string, password: string, username: string) {
    const data = await this.getUserByEmail(email);
    if (data.Count !== 0) throw new BadRequestException();
    let userId = randomUUID();
    const newUser: User = new User(userId, email, password, username);
    await this.database.putUser(newUser);
    return newUser;
  }

  async getUserByEmail(email: string) {
    return await this.database.getUserByEmail(email);
  }
}