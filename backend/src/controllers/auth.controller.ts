import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import { createUserService, getUserByLoginService } from '../services/auth.service';
import { TIUser } from '../../types';
import { emailService } from '@/services/email.service';

const verificationCodes = new Map<string, { code: string, expires: Date }>();
const generateVerificationCode = ():string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const createUserController = async (req: Request, res: Response) => {
    try {
        const newUser: TIUser = req.body;
        const password = newUser.password;
        
        newUser.password = await bcrypt.hashSync(password, 10);
        const createUser = await createUserService(newUser);
        
        if (!createUser) {
            res.status(400).json({ message: "User creation failed" });
            return;
        }
        const verificationCode = generateVerificationCode();
        verificationCodes.set(newUser.email,{
            code: verificationCode,
            expires: new Date(Date.now() + 10 * 60 * 1000) // Code valid for 10 minutes
        })
        try {
            await emailService.sendVerificationCode(newUser.email, verificationCode)
            res.status(201).json({
                message: "User created successfully. A verification email has been sent.",
                user: {
                    id: createUser.id,
                    username: createUser.username,
                    email: createUser.email
                }
            });

            
        } 
       
        
        catch (emailError) {
            console.error("Error sending verification email:", emailError);
            res.status(500).json({ message: "User created, but failed to send verification email." });
            return;
            
            
        }
        
        
    } catch (error) {
        console.error("Error in createUserController:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const user: TIUser = req.body;
        const existingUser = await getUserByLoginService(user);
        
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        const isPasswordValid = bcrypt.compareSync(user.password, existingUser.password);
        
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }
        
        res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email
            }
        });
    } catch (error) {
        console.error("Error in loginUserController:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}