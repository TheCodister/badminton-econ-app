import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { Admin } from './user.entity'

@Entity('branches')
export class Branch {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  branch_id: string

  @Column({ type: 'varchar', length: 100, nullable: false })
  branch_name: string

  @Column({ type: 'text', nullable: false })
  branch_address: string

  @Column({ type: 'varchar', length: 15, nullable: false })
  branch_phone: string

  @OneToMany(() => Admin, (admin) => admin.branch, { cascade: true })
  admins: Admin[]
}
