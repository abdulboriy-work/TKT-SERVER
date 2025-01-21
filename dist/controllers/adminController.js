"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const adminService_1 = require("~/services/adminService");
const auth_1 = require("~/utils/auth");
class AdminController {
    static async register(req, res) {
        try {
            const { username, password, firstName, lastName, phoneNumber } = req.body;
            const hashedPassword = await (0, auth_1.hashPassword)(password);
            const admin = await adminService_1.AdminService.createAdmin({
                username,
                password: hashedPassword,
                firstName,
                lastName,
                phoneNumber
            });
            const { password: _, ...adminWithoutPassword } = admin;
            res.status(201).json(adminWithoutPassword);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await adminService_1.AdminService.login(username, password);
            console.log(result);
            res.json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    static async createSuperAdmin(req, res) {
        try {
            const superAdmin = await adminService_1.AdminService.createSuperAdmin();
            res.status(201).json(superAdmin);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async createDefaultAdmin(req, res) {
        try {
            const defaultAdmin = await adminService_1.AdminService.createDefaultAdmin();
            res.status(201).json(defaultAdmin);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async getProfile(req, res) {
        try {
            const admin = await adminService_1.AdminService.findById(req.admin.id);
            if (!admin) {
                return res.status(404).json({ error: 'Admin not found' });
            }
            const { password: _, ...adminWithoutPassword } = admin;
            res.json(adminWithoutPassword);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.AdminController = AdminController;
