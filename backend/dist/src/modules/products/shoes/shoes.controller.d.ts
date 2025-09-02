import { Shoes } from 'src/models/shoes.entity';
import { ShoesService } from './shoes.service';
export declare class ShoesController {
    private readonly shoesService;
    constructor(shoesService: ShoesService);
    create(shoesData: Partial<Shoes>): Promise<any>;
    findAll(filters: Record<string, string>): Promise<any>;
}
