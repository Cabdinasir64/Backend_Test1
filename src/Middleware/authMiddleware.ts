import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if (!token) return res.status(401).json({ message: 'No token provided' });
    next();
};
