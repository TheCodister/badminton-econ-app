import { PrismaService } from 'prisma/prisma.service';
export declare class ShoesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    findAll(filters: Record<string, string>): Promise<any>;
}
