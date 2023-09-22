import { TodoEntity } from 'src/entities';
import { DataSource } from 'typeorm';

export const todosProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TodoEntity),
    inject: ['DATA_SOURCE'],
  },
];
