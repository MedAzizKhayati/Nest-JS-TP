import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateDTO } from "./dto/create.dto";
import { UpdateDTO } from "./dto/update.dto";
import { TimeStampedEntity } from "./tiemstamp.entity";

export class CRUDService {
    constructor(
        @InjectRepository(TimeStampedEntity)
        private repository: Repository<TimeStampedEntity>,
    ) { }

    create(createEntityDto: CreateDTO) {
        return this.repository.save(createEntityDto);
    }

    paginateQuery(queryBuilder: SelectQueryBuilder<TimeStampedEntity>, page = 1, limit = 0) {
        if (limit > 0)
            queryBuilder = queryBuilder.take(limit).skip((page - 1) * limit);
        return queryBuilder.getRawMany();
    }

    findAll(page = 1, limit = 0) {
        let qb = this.repository.createQueryBuilder('entity');
        qb = qb.select();
        if (limit > 0)
            qb = qb.take(limit).skip((page - 1) * limit);
        return qb.getRawMany();
    }

    findOne(id: string) {
        return this.repository.findOne({ where: { id } });
    }

    update(id: string, updateEntityDto: UpdateDTO) {
        return this.repository.preload({id, ...updateEntityDto});
    }

    remove(id: string) {
        return this.repository.softDelete(id);
    }
}
