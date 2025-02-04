"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examRoutes = void 0;
const express_1 = require("express");
const examController_1 = require("../controllers/examController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.examRoutes = router;
router.use(auth_1.authenticate);
router.use(auth_1.requireAdmin);
router.post('/bulk', examController_1.ExamController.bulkCreate);
router.post('/', examController_1.ExamController.create);
router.get('/', examController_1.ExamController.getAll);
router.get('/:id', examController_1.ExamController.getById);
router.put('/:id', examController_1.ExamController.update);
router.post('/:idNumber/results', examController_1.ExamController.getExamResults);
router.patch('/:id/result', examController_1.ExamController.updateResult);
router.delete('/:id', examController_1.ExamController.delete);
