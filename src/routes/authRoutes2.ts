import express from 'express';
import { signup, protectedRoute } from './../Controllers/authController2';
import { auth } from './../Middleware/authMiddleware2';
import limit from './../Middleware/userRateLimit'

const router = express.Router();

router.post('/signup2', signup);
router.get('/protected2', auth, limit, protectedRoute);

export default router;
