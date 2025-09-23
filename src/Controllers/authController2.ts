import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

export const signup = (req: Request, res: Response) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ message: 'Username required' });

    const payload = { username };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

    res.json({ token });
};

export const protectedRoute = (req: any, res: Response) => {
    res.json({ message: `Hello ${req.user.username}, you accessed protected data!` });
};
