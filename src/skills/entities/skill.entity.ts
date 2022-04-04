import { Cv } from "src/cv/entities/cv.entity";
import { TimeStampedEntity } from "src/generics/tiemstamp.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("skill")
export class Skill extends TimeStampedEntity{
    @Column({})
    designation: string;

    @ManyToMany(type => Cv)
    @JoinTable({
        name: "cv_skills", 
        joinColumn: {
            name: "skill", 
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "cv", // nom du champ représentant l’entité en relation avec cet entité
            referencedColumnName: "id"
        }
    })
    cvs: Cv[]
}
