import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/generics/crud.service';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService extends CRUDService {
  constructor(
    @InjectRepository(Cv)
    private todoRepository: Repository<Cv>,
  ) {
    super(todoRepository);
  }
}
