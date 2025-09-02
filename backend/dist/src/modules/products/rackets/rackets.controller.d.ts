import { Prisma } from '@prisma/client';
import { RacketsService } from './rackets.service';
export declare class RacketsController {
    private readonly racketsService;
    constructor(racketsService: RacketsService);
    create(racketData: Prisma.ProductCreateInput & {
        racket: Prisma.RacketCreateInput;
    }): Promise<any>;
    findAll(filters: Record<string, string>): Promise<any>;
    findOne(id: string): Promise<any>;
}
