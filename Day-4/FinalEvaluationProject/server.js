import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth/v1', authRoutes);
app.use('/api/users/v1', userRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
    }
);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
