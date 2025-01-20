import { Column, Entity } from 'typeorm'
import { Product } from './product.entity'

@Entity('rackets')
export class Racket extends Product {
  @Column()
  line: string

  @Column()
  stiffness: string

  @Column()
  weight: string

  @Column()
  balance: string

  @Column()
  max_tension: string

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  length: number

  @Column('jsonb')
  technology: Record<string, any>
}
