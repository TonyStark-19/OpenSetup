// import dependencies
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// env variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_jwt_secret';

// auth check
export const requireAuth = (req: Request, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token required',
            code: 'TOKEN_MISSING'
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: string;
            email: string;
        };

        // attach user to request
        (req as any).user = decoded;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Session expired. Please sign in again.',
                code: 'TOKEN_EXPIRED'
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({
                success: false,
                message: 'Invalid authentication token.',
                code: 'TOKEN_INVALID'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Authentication validation failed.',
            code: 'AUTH_ERROR'
        });
    }
};