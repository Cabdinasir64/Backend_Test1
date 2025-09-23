import { Request, Response, NextFunction } from 'express';

const auth = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey || apiKey !== '12345') {
        return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
    }

    next();
};

export default auth;
