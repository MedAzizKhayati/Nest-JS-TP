import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/generics/crud.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService extends CRUDService {
  constructor(
    @InjectRepository(User)
    private todoRepository: Repository<User>,
  ) { 
    super(todoRepository);
  }
}
