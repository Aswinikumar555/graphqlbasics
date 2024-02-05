import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Type } from 'class-transformer'

@Entity({ name: 'user' })
export class User {
  constructor(attributes: Partial<User>) {
    if (attributes) {
      this.validate(attributes)
      Object.assign(this, attributes)
    }
  }

  private validate(attrs: Partial<User>) {}

  @PrimaryGeneratedColumn()
  id!: number

  @Type(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @Type(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @Column({ type: 'varchar', name: 'name', nullable: false })
  name!: string

  @Column({ type: 'varchar', name: 'email', nullable: false })
  email!: number
}
