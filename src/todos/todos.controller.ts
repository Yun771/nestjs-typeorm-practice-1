import { Controller, Get, Param } from '@nestjs/common';
import { TodoEntity } from 'src/entities';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get(':userId')
  getTodosByUser(@Param('userId') userId: string): Promise<TodoEntity[]> {
    return this.todoService.getAllTodosByUser(userId);
  }
}
