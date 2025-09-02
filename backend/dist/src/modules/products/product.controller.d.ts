import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(search?: string, limit?: number): Promise<{
        price: number;
        id: string;
        image_url: string;
        product_name: string;
    }[]>;
}
