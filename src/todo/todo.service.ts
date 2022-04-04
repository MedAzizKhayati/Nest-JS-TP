import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { TodoEntity } from './Entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './update-todo.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';
import { CRUDService } from 'src/generics/crud.service';

@Injectable()
export class TodoService extends CRUDService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) { 
    super(todoRepository);
  }

  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  findAllByCriterias(searchTodoDto: SearchTodoDto = new SearchTodoDto(), page = 1, limit = 0): Promise<TodoEntity[]> {
    let qb = this.todoRepository.createQueryBuilder('todo');
    
    qb = qb.select();

    if (searchTodoDto.criteria)
      qb = qb
        .where('(name LIKE :name OR description LIKE :description)')
        .setParameters({
          name: '%' + searchTodoDto.criteria + '%',
          description: '%' + searchTodoDto.criteria + '%',
        });

    if (searchTodoDto.status)
      qb = qb
        .andWhere('status = :status')
        .setParameters({ status: searchTodoDto.status });
  
    return this.paginateQuery(qb, page, limit);
  }

  getStats(){
    return this.todoRepository.createQueryBuilder('todo')
      .select('status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('status')
      .getRawMany();
  }
}
