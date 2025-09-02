"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RacketsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../prisma/prisma.service");
let RacketsService = class RacketsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        return this.prisma.product.create({ data: createProductDto });
    }
    async findOne(id) {
        return this.prisma.racket.findUnique({
            where: { id },
            include: { product: true },
        });
    }
    async findAll(filters) {
        const where = {};
        if (filters.brand) {
            const brands = filters.brand.toUpperCase().split(',');
            where.product = {
                brand: { in: brands },
            };
        }
        if (filters.weight) {
            where.weight = { in: filters.weight.split(',') };
        }
        if (filters.balance) {
            where.balance = { contains: filters.balance, mode: 'insensitive' };
        }
        if (filters.stiffness) {
            where.stiffness = { contains: filters.stiffness, mode: 'insensitive' };
        }
        return this.prisma.racket.findMany({
            where,
            include: { product: true },
        });
    }
};
exports.RacketsService = RacketsService;
exports.RacketsService = RacketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RacketsService);
//# sourceMappingURL=rackets.service.js.map