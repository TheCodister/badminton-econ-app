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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RacketsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rackets_service_1 = require("./rackets.service");
let RacketsController = class RacketsController {
    constructor(racketsService) {
        this.racketsService = racketsService;
    }
    async createRacketsInBulk(data) {
        return this.racketsService.bulkCreateRackets(data);
    }
    create(racketData) {
        return this.racketsService.create(racketData);
    }
    findAll(filters) {
        return this.racketsService.findAll(filters);
    }
    findOne(id) {
        return this.racketsService.findOne(id);
    }
};
exports.RacketsController = RacketsController;
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RacketsController.prototype, "createRacketsInBulk", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new racket product' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                product_name: { type: 'string' },
                brand: { type: 'string' },
                price: { type: 'number' },
                description: { type: 'string' },
                image_url: { type: 'string' },
                status: { type: 'string', enum: ['AVAILABLE', 'OUT_OF_STOCK'] },
                sales: { type: 'boolean' },
                stock: { type: 'integer' },
                available_location: {
                    type: 'array',
                    items: { type: 'string' },
                },
                racket: {
                    type: 'object',
                    properties: {
                        line: { type: 'string' },
                        stiffness: { type: 'string' },
                        weight: { type: 'string' },
                        balance: { type: 'string' },
                        max_tension: { type: 'string' },
                        length: { type: 'number' },
                        technology: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                    },
                },
            },
            required: [
                'product_name',
                'brand',
                'price',
                'description',
                'image_url',
                'status',
                'sales',
                'stock',
                'available_location',
                'racket',
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Racket created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RacketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all rackets with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'weight', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'balance', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'stiffness', required: false }),
    (0, swagger_1.ApiQuery)({
        name: 'price',
        required: false,
        description: 'Sort by price (asc or desc)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Limit the number of results',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        description: 'Page number for pagination',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of rackets' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RacketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get racket by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Racket details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RacketsController.prototype, "findOne", null);
exports.RacketsController = RacketsController = __decorate([
    (0, swagger_1.ApiTags)('Rackets'),
    (0, common_1.Controller)('rackets'),
    __metadata("design:paramtypes", [rackets_service_1.RacketsService])
], RacketsController);
//# sourceMappingURL=rackets.controller.js.map