import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

type Exam = {
  id: string;
  examDate: string;
  module: string;
  candidateNum: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  dateOfBirth: string;
  examCenter: string;
  result: string | null;
  createdAt: Date;
  updatedAt: Date;

}

type CreateExamInput = Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'result'>;
type UpdateExamInput = Partial<Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'candidateId'>>;

type BulkCreateExamInput = {
  examDate: string;
  module: string;
  candidateNum: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  dateOfBirth: string;
  examCenter: string;
  result: string;
}

export class ExamService {
  static async createExam(data: CreateExamInput): Promise<Exam> {
    

    return prisma.exam.create({
      data
    });
  }

  static async findAll(): Promise<Exam[]> {
    return prisma.exam.findMany({
      orderBy: { examDate: 'desc' }
    });
  }

  static async findById(id: string): Promise<Exam | null> {
    return prisma.exam.findUnique({
      where: { id },
    });
  }

  static async getExamResults(idNumber: string, dateOfBirth: string): Promise<Exam[]> {
    return prisma.exam.findMany({
      where: { idNumber, dateOfBirth },
      orderBy: { examDate: 'desc' }
    });
  }

  static async update(id: string, data: UpdateExamInput): Promise<Exam> {
    return prisma.exam.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string): Promise<void> {
    console.log(id)
    await prisma.exam.delete({
      where: { id }
    });
  }

  static async updateResult(id: string, result: string): Promise<Exam> {
    return prisma.exam.update({
      where: { id },
      data: { result },
    });
  }

  static async createManyExams(data: BulkCreateExamInput[]): Promise<{ count: number }> {
    return prisma.exam.createMany({
      data: data
    });
  }
} 