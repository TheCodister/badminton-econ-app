import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Shoes } from 'src/models/shoes.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ShoesService {
  constructor(
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
  ) {}

  async create(data: Partial<Shoes>) {
    const shoes = this.shoesRepository.create(data)
    return this.shoesRepository.save(shoes)
  }

  async findAll(filters: Record<string, string>) {
    const query = this.shoesRepository.createQueryBuilder('shoes')

    if (filters.brand) {
      const brands = filters.brand.split(',')
      query.andWhere('shoes.brand IN (:...brands)', { brands })
    }
    if (filters.size) {
      query.andWhere('shoes.size LIKE :size', {
        size: `%${filters.size}%`,
      })
    }
    if (filters.color) {
      query.andWhere('shoes.color LIKE :color', {
        color: `%${filters.color}%`,
      })
    }

    return query.getMany()
  }
}
