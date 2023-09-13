import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
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
