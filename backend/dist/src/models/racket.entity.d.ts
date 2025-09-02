import { Product } from './product.entity';
export declare class Racket extends Product {
    line: string;
    stiffness: string;
    weight: string;
    balance: string;
    max_tension: string;
    length: number;
    technology: Record<string, any>;
}
