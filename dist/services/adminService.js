"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const auth_1 = require("../utils/auth");
const jwt_1 = require("~/utils/jwt");
const prisma = new client_1.PrismaClient();
class AdminService {
    static async createAdmin(data) {
        const existingAdmin = await prisma.admin.findUnique({
            where: { username: data.username }
        });
        if (existingAdmin) {
            throw new Error('Username already exists');
        }
        return prisma.admin.create({
            data: {
                ...data,
                role: 'ADMIN'
            }
        });
    }
    static async createDefaultAdmin() {
        return prisma.admin.create({
            data: {
                username: 'Bakhodir',
                password: await (0, auth_1.hashPassword)('Bakhodir123-'),
                firstName: 'Bakhodir',
                lastName: 'Bakhodir',
                phoneNumber: '+998939951011',
                role: 'ADMIN'
            }
        });
    }
    static async createSuperAdmin() {
        return prisma.admin.create({
            data: {
                username: 'abdulboriy_codes',
                password: await (0, auth_1.hashPassword)('work_04_08'),
                firstName: 'Abdulboriy',
                lastName: 'Malikov',
                phoneNumber: '+998900174290',
                role: 'ADMIN'
            }
        });
    }
    static async login(username, password) {
        const admin = await prisma.admin.findUnique({
            where: { username }
        });
        if (!admin) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await (0, auth_1.comparePasswords)(password, admin.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = (0, jwt_1.generateToken)({
            id: admin.id,
            username: admin.username,
            role: admin.role
        });
        if (!token) {
            throw new Error('Failed to generate token');
        }
        return { token, admin };
    }
    static async findById(id) {
        return prisma.admin.findUnique({
            where: { id }
        });
    }
}
exports.AdminService = AdminService;
