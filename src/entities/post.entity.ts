import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Type } from 'class-transformer'

@Entity({ name: 'post' })
export class Post {
  constructor(attributes: Partial<Post>) {
    if (attributes) {
      this.validate(attributes)
      Object.assign(this, attributes)
    }
  }

  private validate(attrs: Partial<Post>) {}

  @PrimaryGeneratedColumn()
  id!: number

  @Type(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @Type(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @Column({ type: 'varchar', name: 'title', nullable: false })
  title!: string

  @Column({ type: 'varchar', name: 'content', nullable: false })
  content!: string

  @Column({ type: 'varchar', name: 'author', nullable: false })
  author!: string
}
