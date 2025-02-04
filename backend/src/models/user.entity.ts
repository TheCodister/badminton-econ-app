import { IsEmail, IsNotEmpty } from 'class-validator'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Branch } from './branch.entity'

@Entity('users')
export abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string

  @Column({ length: 100 })
  @IsNotEmpty()
  username: string

  @Column({ unique: true, length: 255 })
  @IsEmail()
  mail: string

  @Column({ length: 15 })
  phone_number: string

  @Column()
  password: string
}

@Entity('customers')
export class Customer extends User {
  @Column('text')
  address: string

  //   @OneToMany(() => Order, (order) => order.customer)
  //   orders: Order[]

  //   @OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.customer)
  //   shoppingCart: ShoppingCart
}

@Entity('admins')
export class Admin extends User {
  @Column()
  branch_id: string

  @ManyToOne(() => Branch, (branch) => branch.admins)
  branch: Branch
}
