import { BadRequestException, Injectable} from "@nestjs/common";
import { UsersDatabase } from "./users.database";
import { randomUUID } from "crypto";
import { User } from "./users.model";

const bcrypt = require('bcrypt');
const saltRounds: number = 10;

@Injectable()
export class UsersService {
  constructor(
    private readonly database: UsersDatabase
  ) {}

  async insertUser(email: string, password: string, username: string) {
    const data = await this.getUserByEmail(email);
    if (data.Count !== 0) throw new BadRequestException();
    const hash = bcrypt.hashSync(password, saltRounds);
    let userId = randomUUID();
    const newUser: User = new User(userId, email, hash, username);
    await this.database.putUser(newUser);
    newUser.password = undefined;
    return newUser;
  }

  async getUserByEmail(email: string) {
    return await this.database.getUserByEmail(email);
  }
}