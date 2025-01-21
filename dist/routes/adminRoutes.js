"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const adminController_1 = require("~/controllers/adminController");
const auth_1 = require("~/middleware/auth");
const router = (0, express_1.Router)();
exports.adminRoutes = router;
// Public routes
router.post('/login', adminController_1.AdminController.login);
router.post('/super-admin', adminController_1.AdminController.createSuperAdmin);
router.post('/default-admin', adminController_1.AdminController.createDefaultAdmin);
// Protected routes
router.post('/register', adminController_1.AdminController.register);
router.get('/profile', auth_1.authenticate, adminController_1.AdminController.getProfile);
