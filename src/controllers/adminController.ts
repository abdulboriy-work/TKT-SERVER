import { AdminService } from '@/services/adminService';
import { hashPassword } from '@/utils/auth';
import { Request, Response } from 'express';


export class AdminController {
  static async register(req: Request, res: Response) {
    try {
      const { username, password, firstName, lastName, phoneNumber } = req.body;
      
      const hashedPassword = await hashPassword(password);
      const admin = await AdminService.createAdmin({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phoneNumber
      });

      const { password: _, ...adminWithoutPassword } = admin;
      res.status(201).json(adminWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const result = await AdminService.login(username, password);
      console.log(result)
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async createSuperAdmin(req: Request, res: Response) {
    try {
      const superAdmin = await AdminService.createSuperAdmin();
      res.status(201).json(superAdmin);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createDefaultAdmin(req: Request, res: Response) {
    try {
      const defaultAdmin = await AdminService.createDefaultAdmin();
      res.status(201).json(defaultAdmin);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const admin = await AdminService.findById(req.admin!.id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      const { password: _, ...adminWithoutPassword } = admin;
      res.json(adminWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 