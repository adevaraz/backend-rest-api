import express from 'express';
import { signIn } from '../controllers/authController.js';
import { deleteUser, getAdmin, getAllAdmin, getAllUsers, getUser, saveUser, updateUser } from '../controllers/userControllers.js';
import { verifyAdmin, verifyUser } from '../middleware/authJwt.js';

const router = express.Router();

// Authentication
router.post('/signin', signIn);

// CRUD
router.get('/user', verifyAdmin, getAllUsers);
router.get('/user/:id', verifyUser, getUser);
router.get('/admin', verifyAdmin, getAllAdmin);
router.get('/admin/:id', verifyAdmin, getAdmin);
router.post('/user', verifyAdmin, saveUser);
router.patch('/update/:id', verifyAdmin, updateUser)
router.delete('/delete/:id', verifyAdmin, deleteUser);

export default router;