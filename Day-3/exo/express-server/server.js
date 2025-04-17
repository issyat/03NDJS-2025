import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API Express with MongoDB and JWT');
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});