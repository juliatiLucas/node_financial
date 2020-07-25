import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import Debit from './Debit'
import Category from './Category'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  email!: string

  @Column()
  name!: string

  @Column()
  password!: string

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  limit!: number

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0 })
  balance!: number

  @OneToMany(() => Debit, (debit) => debit.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  debits!: Debit[]

  @OneToMany(() => Category, (category) => category.user)
  categories!: Category[]
}

export default User
