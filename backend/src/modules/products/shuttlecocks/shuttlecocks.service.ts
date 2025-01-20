import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Shuttlecock } from 'src/models/shuttlecock.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ShuttlecocksService {
  constructor(
    @InjectRepository(Shuttlecock)
    private readonly shuttlecockRepository: Repository<Shuttlecock>,
  ) {}

  async create(data: Partial<Shuttlecock>) {
    const shuttlecock = this.shuttlecockRepository.create(data)
    return this.shuttlecockRepository.save(shuttlecock)
  }

  async findAll(filters: Record<string, string>) {
    const query = this.shuttlecockRepository.createQueryBuilder('shuttlecock')
    return query.getMany()
  }
}
