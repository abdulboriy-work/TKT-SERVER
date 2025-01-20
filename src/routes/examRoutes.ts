import { Router } from 'express';
import { ExamController } from '../controllers/examController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();


router.use(authenticate);
router.use(requireAdmin);


router.post('/bulk', ExamController.bulkCreate);

router.post('/', ExamController.create);
router.get('/', ExamController.getAll);
router.get('/:id', ExamController.getById);
router.put('/:id', ExamController.update);
router.post('/:idNumber/results', ExamController.getExamResults);
router.patch('/:id/result', ExamController.updateResult);
router.delete('/:id', ExamController.delete);

export { router as examRoutes }; 