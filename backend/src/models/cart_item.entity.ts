import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  item_id: string

  @Column({ type: 'uuid', nullable: false })
  cart_id: string

  // @ManyToOne(() => ShoppingCart, (cart) => cart.cart_items, {
  //   onDelete: 'CASCADE',
  // })
  // cart: ShoppingCart

  @Column({ type: 'varchar', length: 100, nullable: false })
  product_id: string

  @Column({ type: 'integer', nullable: false })
  quantity: number
}
