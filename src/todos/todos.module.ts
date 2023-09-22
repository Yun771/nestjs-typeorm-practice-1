import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { DatabaseModule } from 'src/config/db.module';
import { todosProviders } from 'src/providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TodosController],
  providers: [...todosProviders, TodosService],
})
export class TodosModule {}
