import { BaseEntity } from 'typeorm';
import { Branch } from './branch.entity';
export declare abstract class User extends BaseEntity {
    user_id: string;
    username: string;
    mail: string;
    phone_number: string;
    password: string;
}
export declare class Customer extends User {
    address: string;
}
export declare class Admin extends User {
    branch_id: string;
    branch: Branch;
}
