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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(data) {
        const { username, email, phone, password, address } = data;
        const existingUser = await this.prisma.user.findUnique({
            where: { mail: email },
        });
        if (existingUser)
            throw new common_1.ConflictException('Email already registered');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                username,
                mail: email,
                phone_number: phone,
                password: hashedPassword,
                role: 'CUSTOMER',
                address,
            },
        });
        return { message: 'User registered successfully' };
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { mail: email },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        return user;
    }
    async login(mail, password) {
        const user = await this.prisma.user.findUnique({
            where: { mail },
        });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.jwtService.sign({ userId: user.user_id });
        return {
            user_id: user.user_id,
            username: user.username,
            mail: user.mail,
            access_token: token,
        };
    }
    async verifyToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map