import { OrderItem } from './order_item.entity';
export declare class Order {
    order_id: string;
    order_date: Date;
    customer_id: string;
    total_price: number;
    order_items: OrderItem[];
}
