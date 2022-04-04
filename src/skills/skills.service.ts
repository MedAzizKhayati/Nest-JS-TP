import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/generics/crud.service';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService extends CRUDService{
  constructor(
    @InjectRepository(Skill)
    private todoRepository: Repository<Skill>,
  ) { 
    super(todoRepository);
  }
}
