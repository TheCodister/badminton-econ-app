import { Shuttlecock } from 'src/models/shuttlecock.entity';
import { Repository } from 'typeorm';
export declare class ShuttlecocksService {
    private readonly shuttlecockRepository;
    constructor(shuttlecockRepository: Repository<Shuttlecock>);
    create(data: Partial<Shuttlecock>): Promise<Shuttlecock>;
    findAll(filters: Record<string, string>): Promise<Shuttlecock[]>;
}
