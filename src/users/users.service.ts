import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { CreatedUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/utils/error-code-db.utils';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
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

  async findByEmailAndPassword(login: LoginDto): Promise<UserEntity> {
    const users = await this.userRepository.find({
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        username: true,
        lastName: true,
      },
      where: {
        email: login.email,
      },
    });

    const [user] = users;

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Email or password is invalid',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'Email or password is invalid',
        },
      );
    }

    const passwordMatched = await bcrypt.compare(login.password, user.password);

    if (!passwordMatched) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Password wrong!',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: 'Password wrong!',
        },
      );
    }
    return user;
  }
}
