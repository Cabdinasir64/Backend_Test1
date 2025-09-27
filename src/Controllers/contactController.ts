import { Request, Response } from "express";
import { sendEmail } from "../utils/email";

export const contactUs = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const textTemplate = `
        New contact message from your website:
        Name: ${name}
        Email: ${email}
        Message: ${message}`;
        
        await sendEmail(
            process.env.EMAIL_USER!,
            `New Contact from ${name}`,
            textTemplate,
            email
        );

        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
        console.log(error);
    }
};
