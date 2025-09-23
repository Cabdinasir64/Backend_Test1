import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './../Controllers/userController';
import validateUser from './../Middleware/validateUser'
import auth from './../Middleware/auth'

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.post('/', auth, validateUser, createUser);
router.put('/:id', auth, validateUser, updateUser);
router.delete('/:id', deleteUser);

export default router;
