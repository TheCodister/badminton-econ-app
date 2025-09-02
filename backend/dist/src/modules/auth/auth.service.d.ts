import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: {
        username: string;
        email: string;
        phone: string;
        password: string;
        address: string;
    }): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        username: string;
        password: string;
        address: string | null;
        user_id: string;
        mail: string;
        phone_number: string;
        role: import("@prisma/client").$Enums.Role;
        branch_id: string | null;
    }>;
    login(mail: string, password: string): Promise<{
        user_id: string;
        username: string;
        mail: string;
        access_token: string;
    }>;
    verifyToken(token: string): Promise<any>;
}
