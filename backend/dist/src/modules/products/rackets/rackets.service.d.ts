import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
export declare class RacketsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: Prisma.ProductCreateInput & {
        racket?: Prisma.RacketCreateInput;
    }): Promise<{
        id: string;
        image_url: string;
        product_name: string;
        brand: import("@prisma/client").$Enums.Brand;
        price: Prisma.Decimal;
        description: string;
        status: import("@prisma/client").$Enums.ProductStatus;
        sales: boolean;
        number_of_sales: number;
        stock: number;
        available_location: Prisma.JsonValue;
    }>;
    findOne(id: string): Promise<{
        product: {
            price: number;
            id: string;
            image_url: string;
            product_name: string;
            brand: import("@prisma/client").$Enums.Brand;
            description: string;
            status: import("@prisma/client").$Enums.ProductStatus;
            sales: boolean;
            number_of_sales: number;
            stock: number;
            available_location: Prisma.JsonValue;
        };
        id: string;
        length: number;
        line: string;
        stiffness: import("@prisma/client").$Enums.Stiffness;
        weight: string;
        balance: import("@prisma/client").$Enums.Balance;
        max_tension: string;
        technology: Prisma.JsonValue;
        playing_style: string;
        player_level: string;
    }>;
    bulkCreateRackets(data: any[]): Promise<{
        id: string;
        length: number;
        line: string;
        stiffness: import("@prisma/client").$Enums.Stiffness;
        weight: string;
        balance: import("@prisma/client").$Enums.Balance;
        max_tension: string;
        technology: Prisma.JsonValue;
        playing_style: string;
        player_level: string;
    }[]>;
    findAll(filters: Record<string, string>): Promise<{
        total: number;
        data: {
            product: {
                price: number;
                id: string;
                image_url: string;
                product_name: string;
                brand: import("@prisma/client").$Enums.Brand;
                description: string;
                status: import("@prisma/client").$Enums.ProductStatus;
                sales: boolean;
                number_of_sales: number;
                stock: number;
                available_location: Prisma.JsonValue;
            };
            id: string;
            length: number;
            line: string;
            stiffness: import("@prisma/client").$Enums.Stiffness;
            weight: string;
            balance: import("@prisma/client").$Enums.Balance;
            max_tension: string;
            technology: Prisma.JsonValue;
            playing_style: string;
            player_level: string;
        }[];
    }>;
}
