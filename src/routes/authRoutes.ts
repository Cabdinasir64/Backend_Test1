import express from 'express';
import { signup, protectedRoute } from './../Controllers/authController';
import { auth } from './../Middleware/authMiddleware';

const router = express.Router();

router.post('/signup', signup);
router.get('/protected', auth, protectedRoute);

export default router;
