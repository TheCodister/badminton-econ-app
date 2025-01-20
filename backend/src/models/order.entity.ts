import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderItem } from './order_item.entity'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string

  @Column({ type: 'timestamp', nullable: false })
  order_date: Date

  @Column({ type: 'uuid', nullable: false })
  customer_id: string

  //   @ManyToOne(() => Customer, (customer) => customer.orders, {
  //     onDelete: 'CASCADE',
  //   })
  //   customer: Customer

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_price: number

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  order_items: OrderItem[]
}
