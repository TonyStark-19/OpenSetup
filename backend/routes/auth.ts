// import neccesary dependencies
import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// initialize routes
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_jwt_secret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Local Signup Route
router.post('/signup', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user to DB (displayName maps to the name passed from frontend)
        const newUser = await User.create({
            email,
            password: hashedPassword,
            displayName: name
        });

        const token = jwt.sign(
            { id: newUser._id.toString(), email: newUser.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                displayName: newUser.displayName
            }
        });
    } catch (error) {
        next(error);
    }
});

// Local Login Route
router.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Fetch user from DB and explicitly include the password field
        const user = await User.findOne({ email }).select('+password');
        if (!user || !user.password) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password in the DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                displayName: user.displayName,
                avatarUrl: user.avatarUrl
            }
        });
    } catch (error) {
        next(error);
    }
});

// Kick off the Google OAuth flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback endpoint Google redirects to after authentication
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login-failed' }),
    (req: Request, res: Response) => {
        // req.user is populated by passport after a successful strategy execution
        const user = req.user as any;

        if (!user) {
            return res.redirect(`${CLIENT_URL}/get-started?error=auth_failed`);
        }

        // Generate JWT Token exactly like local credentials flow
        const token = jwt.sign(
            { id: user._id.toString(), email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Redirect back to frontend home page, attaching token as a query parameter
        res.redirect(`${CLIENT_URL}/?token=${token}`);
    }
);

// Route hit on authentication failure
router.get('/login-failed', (req: Request, res: Response) => {
    res.redirect(`${CLIENT_URL}/get-started?error=auth_failed`);
});

// Log user out out of the passport session
router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(`${CLIENT_URL}/get-started`);
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