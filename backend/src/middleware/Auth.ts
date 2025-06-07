import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
    id: string;
    email: string;
}

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }

        const secret = process.env.JWT_SECRET as string;
        if (!secret) {
            throw new Error('JWT secret is not defined');
        }

        const decoded = jwt.verify(token, secret) as JWTPayload;
        
        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}