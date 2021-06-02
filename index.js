import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import DBConnection from './config/DBConnection.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Database connection
DBConnection();

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/v1/auth', authRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
