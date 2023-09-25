import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TodoEntity } from 'src/entities';
import { TodosService } from './todos.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/todo-create.dto';

@ApiBearerAuth()
@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get(':userId')
  getTodosByUser(@Param('userId') userId: string): Promise<TodoEntity[]> {
    return this.todoService.getAllTodosByUser(userId);
  }

  @Post('create')
  @HttpCode(200)
  createTodo(@Body() createTodo: CreateTodoDto) {
    console.log(createTodo);

    return this.todoService.createTodo(createTodo);
  }
}
