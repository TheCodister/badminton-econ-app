import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('shopping_carts')
export class ShoppingCart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string

  @Column({ type: 'uuid', nullable: false })
  customer_id: string

  //   @ManyToOne(() => Customer, (customer) => customer.shoppingCart, {
  //     onDelete: 'CASCADE',
  //   })
  //   customer: Customer

  //   @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  //   cart_items: CartItem[]
}
