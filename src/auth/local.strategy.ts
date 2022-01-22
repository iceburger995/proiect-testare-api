import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserDTO } from 'modules/User/user.dto';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Partial<UserDTO>> {
    const user = await this.authService.validateUser(password, email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
