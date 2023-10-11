import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { PayloadToken } from './payload.interface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() login: LoginDto) {
    const user = await this.userService.findByEmailAndPassword(login);

    const payload: PayloadToken = { sub: user.id, username: user.username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
