import { PrismaService } from 'prisma/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string, limit?: number): Promise<{
        price: number;
        id: string;
        image_url: string;
        product_name: string;
    }[]>;
}
