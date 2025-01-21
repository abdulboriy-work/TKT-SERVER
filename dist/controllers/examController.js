"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamController = void 0;
const zod_1 = require("zod");
const examService_1 = require("~/services/examService");
const bulkExamSchema = zod_1.z.array(zod_1.z.object({
    examDate: zod_1.z.string().or(zod_1.z.date()),
    module: zod_1.z.string(),
    candidateNum: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    idNumber: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().or(zod_1.z.date()),
    examCenter: zod_1.z.string()
}));
class ExamController {
    static async create(req, res) {
        try {
            const exam = await examService_1.ExamService.createExam(req.body);
            res.status(201).json(exam);
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
    static async getAll(req, res) {
        try {
            const exams = await examService_1.ExamService.findAll();
            res.json(exams);
        }
        catch (error) {
            console.error('Error fetching exams:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const exam = await examService_1.ExamService.findById(id);
            if (!exam) {
                return res.status(404).json({ error: 'Exam not found' });
            }
            res.json(exam);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async getExamResults(req, res) {
        console.log(req.body);
        console.log(req.params);
        try {
            const exams = await examService_1.ExamService.getExamResults(req.body.idNumber, req.body.dateOfBirth);
            res.json(exams);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const exam = await examService_1.ExamService.update(id, req.body);
            res.json(exam);
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
    static async updateResult(req, res) {
        try {
            const { id } = req.params;
            const { result } = req.body;
            const exam = await examService_1.ExamService.updateResult(id, result);
            res.json(exam);
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
    static async delete(req, res) {
        console.log(req.body);
        console.log(req.params);
        try {
            const { id } = req.params;
            await examService_1.ExamService.delete(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    static async bulkCreate(req, res) {
        try {
            const rawExams = req.body;
            // Transform the data to match our schema
            const formattedExams = rawExams.map((exam) => ({
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
            const result = await examService_1.ExamService.createManyExams(formattedExams);
            res.status(201).json({
                message: 'Exams created successfully',
                count: result.count
            });
        }
        catch (error) {
            console.error('Bulk create error:', error);
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.ExamController = ExamController;
