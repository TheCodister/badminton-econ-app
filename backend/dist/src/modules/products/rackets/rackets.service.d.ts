import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export declare class RacketsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: Prisma.ProductCreateInput & {
        racket: Prisma.RacketCreateInput;
    }): Promise<any>;
    findOne(id: string): Promise<any>;
    findAll(filters: Record<string, string>): Promise<any>;
}
