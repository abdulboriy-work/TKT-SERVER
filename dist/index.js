"use strict";
require('module-alias/register');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const adminRoutes_1 = require("./routes/adminRoutes");
const examRoutes_1 = require("./routes/examRoutes");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/admins', adminRoutes_1.adminRoutes);
app.use('/api/exams', examRoutes_1.examRoutes);
// Error handling
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
