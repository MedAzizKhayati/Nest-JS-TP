import { TodoStatusEnum } from '../enums/todo-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStampedEntity } from '../../generics/tiemstamp.entity';

@Entity('todo')
export class TodoEntity extends TimeStampedEntity {
  
  @Column({})
  name: string;
  @Column({})
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum = TodoStatusEnum.waiting;
}
