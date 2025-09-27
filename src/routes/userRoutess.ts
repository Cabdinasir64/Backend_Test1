import { Router } from 'express';
import { registerUser, verifyUser, resendCode } from './../Controllers/userControllers'

const router = Router();

router.post('/register', registerUser);    
router.post('/verify', verifyUser);        
router.post('/resend', resendCode);    

export default router;
