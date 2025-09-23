import { Request, Response } from 'express';

export const signup = (req: Request, res: Response) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username required' });

    const token = Math.random().toString(36).substring(2); 

    res.json({ token });
};

export const protectedRoute = (req: any, res: Response) => {
    res.json({ message: 'You accessed protected data with token!' });
};
