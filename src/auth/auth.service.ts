import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { PayloadToken } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const user = await this.userService.findByEmailAndPassword(login);

    console.log(user);

    const payload: PayloadToken = { sub: user.id, username: user.username };
    console.log(payload);

    const token = await this.jwtService.signAsync(payload);
    console.log(token);

    return {
      access_token: token,
    };
  }
}
