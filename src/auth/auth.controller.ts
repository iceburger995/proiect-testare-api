import { Controller, UseGuards, Request, Post, Inject } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { UserLoginDTO, UserDTO } from 'modules/User/user.dto';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './Guards/local-auth.guard';

@Controller('login')
@ApiTags('Authentication')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDTO })
  @Post('auth')
  async login(@Request() req: { user: UserDTO }): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
