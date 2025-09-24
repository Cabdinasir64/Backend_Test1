import { Request, Response } from "express";
import bcrypt from "bcrypt";

const users: { username: string; passwordHash: string }[] = [];

const saltRounds = Number(process.env.SALT_ROUNDS)

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username iyo password waa loo baahan yahay" });
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    users.push({ username, passwordHash });
    res.json({ message: "User registered successfully!", password, passwordHash, users });
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return res.status(400).json({ message: "User ma jiro" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
        res.json({ message: "Login successful!" });
    } else {
        res.status(401).json({ message: "Password khalad" });
    }
};
