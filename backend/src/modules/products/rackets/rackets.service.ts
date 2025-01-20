import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Racket } from 'src/models/racket.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RacketsService {
  constructor(
    @InjectRepository(Racket)
    private readonly racketRepository: Repository<Racket>,
  ) {}

  async create(data: Partial<Racket>) {
    const racket = this.racketRepository.create(data)
    return this.racketRepository.save(racket)
  }

  async findOne(id: string) {
    return this.racketRepository.findOneBy(id)
  }

  async findAll(filters: Record<string, string>) {
    const query = this.racketRepository.createQueryBuilder('racket')

    if (filters.brand) {
      const brands = filters.brand.split(',')
      query.andWhere('racket.brand IN (:...brands)', { brands })
    }
    if (filters.weight) {
      query.andWhere('racket.weight LIKE :weight', {
        weight: `%${filters.weight}%`,
      })
    }
    if (filters.balance) {
      query.andWhere('racket.balance LIKE :balance', {
        balance: `%${filters.balance}%`,
      })
    }
    if (filters.stiffness) {
      query.andWhere('racket.stiffness LIKE :stiffness', {
        stiffness: `%${filters.stiffness}%`,
      })
    }

    return query.getMany()
  }
}
