import express from 'express';
import {
  getCurrentUser,
  getAllUsers,
  deleteUser
} from '../controllers/userController.js';

import auth from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(auth);

// Route to get the current user's details
router.get('/me', getCurrentUser);

// Route to get all users, accessible only to admins
router.get('/', isAdmin, getAllUsers);

// Route to delete a user by ID, accessible only to admins
router.delete('/:id', isAdmin, deleteUser);

export default router;