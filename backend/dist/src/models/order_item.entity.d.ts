import { Order } from './order.entity';
export declare class OrderItem {
    item_id: string;
    order_id: string;
    order: Order;
    product_id: string;
    quantity: number;
}
