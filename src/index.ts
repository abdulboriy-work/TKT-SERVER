import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { adminRoutes } from './routes/adminRoutes';
import { examRoutes } from './routes/examRoutes';
import { errorHandler } from './middleware/errorHandler';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Routes
app.use('/api/admins', adminRoutes);
app.use('/api/exams', examRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 