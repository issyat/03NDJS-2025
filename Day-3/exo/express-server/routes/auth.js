import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

// Route to handle user registration
router.post('/register', register);

// Route to handle user login
router.post('/login', login);

// Exporting the router to be used in other parts of the application
export default router;