import { PrismaClient } from '@prisma/client/extension';
import { comparePasswords, hashPassword } from '../utils/auth';
import { generateToken } from '../utils/jwt';


const prisma = new PrismaClient();

type Admin = {
  id: string;
  phoneNumber: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  role: string;
}

export class AdminService {
  static async createAdmin(data: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }): Promise<Admin> {
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

  static async createDefaultAdmin(): Promise<Admin> {
    return prisma.admin.create({
      data: {
        username: 'Bakhodir',
        password: await  hashPassword('Bakhodir123-'),
        firstName: 'Bakhodir',
        lastName: 'Bakhodir',
        phoneNumber: '+998939951011',
        role: 'ADMIN'
      }
    });
  }

  static async createSuperAdmin(): Promise<Admin> {
    return prisma.admin.create({
      data: {
        username: 'abdulboriy_codes',
        password: await  hashPassword('work_04_08'),
        firstName: 'Abdulboriy',
        lastName: 'Malikov',
        phoneNumber: '+998900174290',
        role: 'ADMIN'
      }
    });
  }


  static async login(username: string, password: string): Promise<{ token: string, admin: Admin }> {
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePasswords(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({
      id: admin.id,
      username: admin.username,
      role: admin.role
    });

    if (!token) {
      throw new Error('Failed to generate token');
    }



    return { token, admin };
  }

  static async findById(id: string): Promise<Admin | null> {
    return prisma.admin.findUnique({
      where: { id }
    });
  }
} 