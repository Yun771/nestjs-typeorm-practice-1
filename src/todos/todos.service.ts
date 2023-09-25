import { Inject, Injectable } from '@nestjs/common';
import { TodoEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo-create.dto';

@Injectable()
export class TodosService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<TodoEntity>,
  ) {}

  getAllTodosByUser(userId: string): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async createTodo(todoDto: CreateTodoDto): Promise<TodoEntity> {
    try {
      const todo = this.todoRepository.create({
        description: todoDto.description,
        title: todoDto.title,
        status: todoDto.status,
        user: {
          id: todoDto.userId,
        },
      });

      const todoSaved = await this.todoRepository.save(todo);

      return todoSaved;
    } catch (e) {
      console.log(e);
    }
  }
}
