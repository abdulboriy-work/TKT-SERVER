"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ExamService {
    static async createExam(data) {
        return prisma.exam.create({
            data
        });
    }
    static async findAll() {
        return prisma.exam.findMany({
            orderBy: { examDate: 'desc' }
        });
    }
    static async findById(id) {
        return prisma.exam.findUnique({
            where: { id },
        });
    }
    static async getExamResults(idNumber, dateOfBirth) {
        return prisma.exam.findMany({
            where: { idNumber, dateOfBirth },
            orderBy: { examDate: 'desc' }
        });
    }
    static async update(id, data) {
        return prisma.exam.update({
            where: { id },
            data,
        });
    }
    static async delete(id) {
        console.log(id);
        await prisma.exam.delete({
            where: { id }
        });
    }
    static async updateResult(id, result) {
        return prisma.exam.update({
            where: { id },
            data: { result },
        });
    }
    static async createManyExams(data) {
        return prisma.exam.createMany({
            data: data
        });
    }
}
exports.ExamService = ExamService;
