import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Brand } from './brand.enum'

@Entity('products')
export abstract class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  product_id: string

  @Column({ name: 'image_url' }) // Map to 'image_url'
  image_url: string

  @Column()
  product_name: string

  @Column({
    type: 'enum',
    enum: Brand,
  })
  brand: Brand

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column('text')
  description: string

  @Column()
  status: string

  @Column({ default: false })
  sales: boolean

  @Column()
  stock: number

  @Column('jsonb')
  available_location: Record<string, any>
}
