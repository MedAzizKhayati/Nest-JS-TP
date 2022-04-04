import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';


export class TimeStampedEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;
  @CreateDateColumn({})
  updatedAt: Date;
  @DeleteDateColumn({})
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
