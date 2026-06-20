// imports
import { Request, Response, NextFunction } from 'express';

// auth checks
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'You must log in to access this resource' });
    }
    next();
};