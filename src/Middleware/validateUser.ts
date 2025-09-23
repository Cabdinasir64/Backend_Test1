import { Request, Response, NextFunction } from 'express';

const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Name is required and must be a string' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ message: 'Valid email is required' });
    }

    next(); 
};

export default validateUser;
