import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    console.log(`[Backend Log] Processing Registration attempt for: ${email}`);

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log(`[Backend Log] Registration failed: Email ${email} already exists.`);
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        console.log(`[Backend Log] Attempting to save new user to DB...`);
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            console.log(`[Backend Log] Saving successful! New Admin state: ${user.isAdmin}`);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id.toString()),
            });
        } else {
            console.error(`[Backend Log] Invalid User Data occurred during write.`);
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        console.error(`[Backend Error]:`, error.message);
        res.status(500).json({ message: error.message });
    }
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log(`[Backend Log] Processing Login attempt for: ${email}`);

    try {
        const user: any = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            console.log(`[Backend Log] Authentication Match Success for ${email}`);
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id.toString()),
            });
        } else {
            console.warn(`[Backend Log] Authentication failed (Invalid Credentials) for ${email}`);
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        console.error(`[Backend Error]:`, error.message);
        res.status(500).json({ message: error.message });
    }
};
