import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from './User'
import Category from './Category'

@Entity()
class Debit {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  description!: string

  @CreateDateColumn()
  created_at!: Date

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  value!: number

  @ManyToOne(() => User, (user) => user.debits, { cascade: true })
  user!: User

  @ManyToOne(() => Category, (category) => category.debits)
  category!: Category
}

export default Debit
