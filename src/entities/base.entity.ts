import { Entity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class baseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @CreateDateColumn({
    name: 'created_at'
  })
    createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
    updatedAt?: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at'
  })
    deletedAt?: Date | null;
}
