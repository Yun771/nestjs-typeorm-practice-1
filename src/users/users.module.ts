import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbModule } from 'src/config/db.module';
import { usersProviders } from 'src/providers/users.providers';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
