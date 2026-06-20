// import neccesary dependencies
import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

// initialize routes
const router = Router();

// Kick off the Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback endpoint Google redirects to after authentication
router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL || 'http://localhost:3000/dashboard',
        failureRedirect: '/auth/login-failed'
    })
);

// Route hit on authentication failure
router.get('/login-failed', (req: Request, res: Response) => {
    res.status(401).json({ success: false, message: 'Authentication failed' });
});

// Log user out out of the passport session
router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(process.env.CLIENT_URL || 'http://localhost:3000/');
    });
});

// Get currently logged-in user details
router.get('/current-user', (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false, message: 'Not logged in' });
    }
    res.status(200).json({ authenticated: true, user: req.user });
});

// export router
export default router;