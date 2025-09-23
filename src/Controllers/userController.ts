import { Request, Response } from 'express';

interface User {
    id: number;
    name: string;
    email: string;
}

let users: User[] = [
    { id: 1, name: 'Abdinasir', email: 'abdinasir@example.com' },
    { id: 2, name: 'Amina', email: 'amina@example.com' },
];

export const getUsers = (req: Request, res: Response) => {
    res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

export const createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = name || user.name;
    user.email = email || user.email;
    res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    users = users.filter(u => u.id !== id);
    res.json({ message: 'User deleted' });
};
