import { BaseEntity } from 'typeorm';
import { Brand } from './brand.enum';
export declare abstract class Product extends BaseEntity {
    product_id: string;
    image_url: string;
    product_name: string;
    brand: Brand;
    price: number;
    description: string;
    status: string;
    sales: boolean;
    stock: number;
    available_location: Record<string, any>;
}
