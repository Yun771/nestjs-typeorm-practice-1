import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/config/db.module';
import { usersProviders } from 'src/providers';

@Module({
  imports: [DatabaseModule],
  exports: [...usersProviders, UsersService],
  controllers: [UsersController],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
