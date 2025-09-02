import { Shuttlecock } from 'src/models/shuttlecock.entity';
import { ShuttlecocksService } from './shuttlecocks.service';
export declare class ShuttlecocksController {
    private readonly shuttlecocksService;
    constructor(shuttlecocksService: ShuttlecocksService);
    create(shuttlecockData: Partial<Shuttlecock>): Promise<Shuttlecock>;
    findAll(filters: Record<string, string>): Promise<Shuttlecock[]>;
}
