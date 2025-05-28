import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        
        
        const user = await authService.registerUserService({ username, email, password });
        
       
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(201).json({
            message: "User registered successfully",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Attempt login
        const user = await authService.loginUserService(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login" });
    }
};