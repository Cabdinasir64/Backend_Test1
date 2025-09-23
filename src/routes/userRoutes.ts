import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './../Controllers/userController';
import validateUser from './../Middleware/validateUser'
import auth from './../Middleware/auth'
import userRateLimit from './../Middleware/userRateLimit';

const router = express.Router();

router.get('/', auth, userRateLimit, getUsers);
router.get('/:id', auth, userRateLimit, getUserById);
router.post('/', auth, validateUser, createUser);
router.put('/:id', auth, validateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;
