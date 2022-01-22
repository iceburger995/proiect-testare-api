import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { comparePassword } from 'helpers/passwordHelpers';
import { UserDTO } from 'modules/User/user.dto';
import { UserService } from 'modules/User/user.service';

@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async validateUser(password: string, email: string): Promise<Partial<UserDTO | null>> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await comparePassword(password, user.password))) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: UserDTO): Promise<{ user: UserDTO; access_token: string }> {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
