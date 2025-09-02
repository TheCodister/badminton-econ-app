import { ShoppingCartService } from './cart.service';
export declare class ShoppingCartController {
    private shoppingCartService;
    constructor(shoppingCartService: ShoppingCartService);
    getCart(customerId: string): Promise<{
        cart_items: {
            product: {
                price: number;
                id: string;
                image_url: string;
                product_name: string;
            };
            cart_id: string;
            item_id: string;
            product_id: string;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        cart_id: string;
        customer_id: string;
    }>;
    addToCart(customerId: string, productId: string, body: {
        quantity?: number;
    }): Promise<{
        cart_id: string;
        item_id: string;
        product_id: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changeQuantity(customerId: string, productId: string, quantity: number): Promise<{
        cart_id: string;
        item_id: string;
        product_id: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    removeFromCart(customerId: string, productId: string): Promise<{
        message: string;
    }>;
    clearCart(customerId: string): Promise<{
        message: string;
    }>;
}
