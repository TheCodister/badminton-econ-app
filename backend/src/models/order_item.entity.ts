import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  item_id: string

  @Column({ type: 'uuid', nullable: false })
  order_id: string

  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  order: Order

  @Column({ type: 'varchar', length: 100, nullable: false })
  product_id: string

  @Column({ type: 'integer', nullable: false })
  quantity: number
}
