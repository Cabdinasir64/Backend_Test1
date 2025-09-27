import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { generate6DigitCode } from './../utils/generateToken';
import dotenv from 'dotenv';

dotenv.config();

interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
  verificationCode?: string;
  codeExpiresAt?: number;
}

let users: User[] = [];

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'name and email required' });

  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing && existing.verified) {
    return res.status(400).json({ message: 'Email already registered and verified' });
  }

  const code = generate6DigitCode();
  const expiresInMinutes = 10;
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;

  let user: User;
  if (existing) {
    existing.verificationCode = code;
    existing.codeExpiresAt = expiresAt;
    existing.name = name;
    existing.verified = false;
    user = existing;
  } else {
    user = {
      id: users.length + 1,
      name,
      email,
      verified: false,
      verificationCode: code,
      codeExpiresAt: expiresAt,
    };
    users.push(user);
  }

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"No reply" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Your verification code',
      text: `Hello ${user.name},\n\nYour verification code is: ${code}\nThis code expires in ${expiresInMinutes} minutes.`,
      html: `<p>Hello ${user.name},</p><p>Your verification code is: <b>${code}</b></p><p>This code expires in ${expiresInMinutes} minutes.</p>`,
    });

    return res.status(201).json({
      message: 'User registered Verification code sent to email.',
      email: user.email,
      expiresAt,
    });
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ message: 'Failed to send verification email' });
  }
};

export const verifyUser = (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: 'email and code required' });

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(400).json({ message: 'Invalid email or code' });
  if (user.verified) return res.status(400).json({ message: 'User already verified' });
  if (!user.verificationCode) return res.status(400).json({ message: 'No active verification code. Request resend.' });

  if (Date.now() > (user.codeExpiresAt || 0)) {
    return res.status(400).json({ message: 'Code expired. Request a new code.' });
  }

  if (user.verificationCode !== code) {
    return res.status(400).json({ message: 'Invalid code' });
  }

  user.verified = true;
  delete user.verificationCode;
  delete user.codeExpiresAt;

  return res.json({ message: 'Email verified successfully!', email: user.email });
};

export const resendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'email required' });

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(400).json({ message: 'Email not found. Register first.' });
  if (user.verified) return res.status(400).json({ message: 'User already verified' });

  const code = generate6DigitCode();
  const expiresInMinutes = 10;
  user.verificationCode = code;
  user.codeExpiresAt = Date.now() + expiresInMinutes * 60 * 1000;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"No Reply" <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Your new verification code',
      text: `Your new verification code is: ${code}`,
      html: `<p>Your new verification code is: <b>${code}</b></p>`,
    });

    console.log(`Resent code ${code} to ${user.email}`);

    return res.json({ message: 'New code sent', email: user.email, expiresAt: user.codeExpiresAt });
  } catch (err) {
    console.error('Error sending mail', err);
    return res.status(500).json({ message: 'Failed to resend verification email' });
  }
};
