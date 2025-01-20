import { Column, Entity } from 'typeorm'
import { Product } from './product.entity'

@Entity('shuttlecocks')
export class Shuttlecock extends Product {
  @Column()
  shuttle_type: string

  @Column()
  speed: number

  @Column()
  no_per_tube: number
}
