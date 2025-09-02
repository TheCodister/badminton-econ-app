import { Prisma } from '@prisma/client';
import { RacketsService } from './rackets.service';
export declare class RacketsController {
    private readonly racketsService;
    constructor(racketsService: RacketsService);
    createRacketsInBulk(data: any[]): Promise<{
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
    create(racketData: Prisma.ProductCreateInput & {
        racket: Prisma.RacketCreateInput;
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
}
