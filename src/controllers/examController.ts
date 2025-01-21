
import { Exam } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { ExamService } from '~/services/examService';

const bulkExamSchema = z.array(z.object({
  examDate: z.string().or(z.date()),
  module: z.string(),
  candidateNum: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  idNumber: z.string(),
  dateOfBirth: z.string().or(z.date()),
  examCenter: z.string()
}));

export class ExamController {
  static async create(req: Request, res: Response) {
    try {
      const exam = await ExamService.createExam(req.body);
      res.status(201).json(exam);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const exams = await ExamService.findAll();

      res.json(exams);
    } catch (error) {
      console.error('Error fetching exams:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exam = await ExamService.findById(id);

      if (!exam) {
        return res.status(404).json({ error: 'Exam not found' });
      }

      res.json(exam);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  static async getExamResults(req: Request, res: Response) {
    console.log(req.body)
    console.log(req.params)
    try {
      const exams = await ExamService.getExamResults(req.body.idNumber, req.body.dateOfBirth);
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exam = await ExamService.update(id, req.body);
      res.json(exam);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async updateResult(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { result } = req.body;
      const exam = await ExamService.updateResult(id, result);
      res.json(exam);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async delete(req: Request, res: Response) {

    console.log(req.body)
    console.log(req.params)
    try {
      const { id } = req.params;


      await ExamService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async bulkCreate(req: Request, res: Response) {
    try {
      const rawExams = req.body;

      // Transform the data to match our schema
      const formattedExams = rawExams.map((exam: any) => ({
        examDate: exam['Exam date'],
        module: exam['Module'],
        candidateNum: exam['Candidate number'].toString(),
        firstName: exam['First name'],
        lastName: exam['Last name'],
        idNumber: exam['ID Number'],
        dateOfBirth: exam['Date of birth'] === 'Invalid date' ? '1900-01-01' : exam['Date of birth'].split('T')[0],
        examCenter: exam['Exam centre'],
        result: exam['Result']
      }));

      const result = await ExamService.createManyExams(formattedExams);

      res.status(201).json({
        message: 'Exams created successfully',
        count: result.count
      });
    } catch (error) {
      console.error('Bulk create error:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
} 