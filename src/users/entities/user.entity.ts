import { Cv } from "src/cv/entities/cv.entity";
import { TimeStampedEntity } from "src/generics/tiemstamp.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends TimeStampedEntity {
  @Column({})
  username: string;
  @Column({})
  email: string;
  @Column({})
  password: string;
  @OneToMany(
    type => Cv,
    (cv) => cv.user,
    {
      nullable: true,
      cascade: true
    }
  )
  cvs: Cv[];
}
