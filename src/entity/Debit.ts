import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import User from './User'

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
}

export default Debit
