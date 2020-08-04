import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import User from './User'
import Debit from './Debit'

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ nullable: true, default: '2cab7f' })
  color!: string

  @ManyToOne(() => User, (user) => user.categories)
  user!: User

  @OneToMany(() => Debit, (debit) => debit.category, {onDelete: 'SET NULL'})
  debits!: Debit[]
}

export default Category
