import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/decorator/public.decorator';
import { PayloadToken } from 'src/interfaces/payload.interface';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post()
  async login(@Body() login: LoginDto) {
    const user = await this.userService.findByEmailAndPassword(login);

    const payload: PayloadToken = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
