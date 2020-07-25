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

  @ManyToOne(() => User, (user) => user.categories)
  user!: User

  @OneToMany(() => Debit, (debit) => debit.category)
  debits!: Debit[]
}

export default Category
