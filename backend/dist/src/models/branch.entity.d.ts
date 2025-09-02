import { Admin } from './user.entity';
export declare class Branch {
    branch_id: string;
    branch_name: string;
    branch_address: string;
    branch_phone: string;
    admins: Admin[];
}
