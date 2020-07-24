import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Debit from './Debit'

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

  @ManyToOne(() => Debit, (debit) => debit.user, { eager: true })
  debits!: Debit[]
}

export default User
