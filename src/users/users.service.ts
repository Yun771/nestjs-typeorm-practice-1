import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { CreatedUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/utils/error-code-db';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(userDto: CreatedUserDto) {
    try {
      const { password } = userDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.userRepository.create(userDto);

      user.password = hashedPassword;

      const userSaved = await this.userRepository.save(user);

      return {
        success: true,
        data: userSaved,
      };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        console.log('asdasdsadsadassdasd<');

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'User with that email already exists',
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: 'User with that email already exists',
          },
        );
      }
      throw new Error('Something went wrong');
    }
  }
}
