import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: {
        mail: string;
        password: string;
    }): Promise<{
        user_id: string;
        username: string;
        mail: string;
        access_token: string;
    }>;
    register(body: {
        username: string;
        email: string;
        phone: string;
        password: string;
        address: string;
    }): Promise<{
        message: string;
    }>;
    verifyToken(authHeader: string): Promise<any>;
}
