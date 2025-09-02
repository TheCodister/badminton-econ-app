import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/models/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly customerRepository;
    private readonly jwtService;
    constructor(customerRepository: Repository<Customer>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
}
