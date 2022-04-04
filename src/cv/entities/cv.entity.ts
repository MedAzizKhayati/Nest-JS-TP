import { TimeStampedEntity } from "src/generics/tiemstamp.entity";
import { Skill } from "src/skills/entities/skill.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";

@Entity("cv")
export class Cv extends TimeStampedEntity {
    @Column({})
    name: string;

    @Column({})
    firstname: string;

    @Column({})
    age: number;

    @Column({})
    cin: string;

    @Column({})
    job: string;

    @Column({})
    path: string;

    @ManyToOne(
        type => User,
        (user) => user.cvs,
        {
            cascade: ['insert', 'update'],
            nullable: true,
            eager: true
        }
    )
    user: User;

    @ManyToMany(type => Skill)
    skills: Skill[]
}
