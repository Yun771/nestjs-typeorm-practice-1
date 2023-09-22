import { Inject, Injectable } from '@nestjs/common';
import { TodoEntity } from 'src/entities';
import { Repository } from 'typeorm';

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
}
