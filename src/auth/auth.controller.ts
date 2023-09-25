import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
