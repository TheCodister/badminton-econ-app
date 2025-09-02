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
        const { racket, ...productData } = createProductDto;
        return this.prisma.product.create({
            data: {
                ...productData,
                racket: {
                    create: {
                        ...racket,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const racket = await this.prisma.racket.findUnique({
            where: { id },
            include: { product: true },
        });
        return {
            ...racket,
            product: {
                ...racket.product,
                price: parseFloat((+racket.product.price / 24000).toFixed(2)),
            },
        };
    }
    async bulkCreateRackets(data) {
        const created = await this.prisma.$transaction(data.map((entry) => this.prisma.racket.create({
            data: {
                balance: entry.racket.balance,
                length: entry.racket.length,
                player_level: entry.racket.player_level,
                playing_style: entry.racket.playing_style,
                stiffness: entry.racket.stiffness,
                weight: entry.racket.weight,
                line: entry.racket.line,
                technology: entry.racket.technology,
                max_tension: entry.racket.max_tension,
                product: {
                    create: {
                        image_url: entry.image_url,
                        product_name: entry.product_name,
                        brand: entry.brand,
                        price: entry.price,
                        description: entry.description,
                        status: entry.status,
                        sales: entry.sales,
                        stock: entry.stock,
                        available_location: entry.available_location,
                    },
                },
            },
        })));
        return created;
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
            const weights = filters.weight.split(',').map((w) => w.trim());
            where.OR = weights.map((w) => ({
                weight: { contains: w, mode: 'insensitive' },
            }));
        }
        if (filters.balance) {
            const balances = filters.balance
                .split(',')
                .map((b) => b.replace(/\s+/g, ''));
            where.balance = { in: balances };
        }
        if (filters.stiffness) {
            const stiffness = filters.stiffness
                .split(',')
                .map((s) => s.replace(/\s+/g, ''));
            where.stiffness = { in: stiffness };
        }
        const orderBy = [];
        if (filters.price) {
            orderBy.push({
                product: {
                    price: filters.price.toLowerCase() === 'asc' ? 'asc' : 'desc',
                },
            });
        }
        const take = filters.limit ? parseInt(filters.limit, 10) : undefined;
        const page = filters.page ? parseInt(filters.page, 10) : 1;
        const skip = take ? (page - 1) * take : undefined;
        const totalCount = await this.prisma.racket.count({
            where,
        });
        const racks = await this.prisma.racket.findMany({
            where,
            orderBy,
            take,
            skip,
            include: { product: true },
        });
        return {
            total: totalCount,
            data: racks.map((r) => ({
                ...r,
                product: {
                    ...r.product,
                    price: parseFloat((+r.product.price / 24000).toFixed(2)),
                },
            })),
        };
    }
};
exports.RacketsService = RacketsService;
exports.RacketsService = RacketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RacketsService);
//# sourceMappingURL=rackets.service.js.map