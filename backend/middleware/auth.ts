// import dependencies
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// env variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_jwt_secret';

// auth check
export const requireAuth = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };

        // Attach decoded data to req.user using type assertion to satisfy Passport/Express types
        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};