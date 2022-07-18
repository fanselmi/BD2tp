import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.model";
import { JwtService } from "@nestjs/jwt";
import { UrlsService } from "../urls/urls.service";

const ID_LENGTH: number = 5;
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private urlsService: UrlsService,
              private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const data = await this.usersService.getUserByEmail(email);
    if (data.Count === 1) {
      const userMap = new Map<string, any>;
      Object.entries(data.Items[0]).forEach(([key, value]) => {userMap.set(key, value)});
      const user = new User(userMap.get('userId'), userMap.get('email'), userMap.get('password'), userMap.get('username'));
      if (bcrypt.compareSync(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async urlBelongs(userId: string, id: string) {
    if (id.length !== ID_LENGTH) throw new BadRequestException();
    const data = await this.urlsService.getUrlByUser(userId, id);
    if (data.Item === undefined) throw new UnauthorizedException();
    return data.Item.clicks;
  }
}
