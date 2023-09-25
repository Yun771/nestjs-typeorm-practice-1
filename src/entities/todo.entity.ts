import { UserEntity } from 'src/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  status: string;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn()
  user: UserEntity;

  @Column()
  @RelationId((todo: TodoEntity) => todo.user)
  userId: string;
}
