import { Column, Entity } from 'typeorm'
import { Product } from './product.entity'

@Entity('shoes')
export class Shoes extends Product {
  @Column('jsonb')
  color: Record<string, any>

  @Column('jsonb')
  size: Record<string, any>

  @Column('jsonb')
  available_size: Record<string, any>

  @Column('jsonb')
  technology: Record<string, any>
}
