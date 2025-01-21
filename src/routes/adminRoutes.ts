import { Router } from 'express';
import { AdminController } from '~/controllers/adminController';

import { authenticate } from '~/middleware/auth';


const router = Router();

// Public routes
router.post('/login', AdminController.login);
router.post('/super-admin', AdminController.createSuperAdmin);
router.post('/default-admin', AdminController.createDefaultAdmin);

// Protected routes
router.post('/register', AdminController.register);
router.get('/profile', authenticate, AdminController.getProfile);

export { router as adminRoutes }; 