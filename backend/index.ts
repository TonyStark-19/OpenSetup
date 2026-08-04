// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';

// import routes
import authRoutes from './routes/auth';
import requestRoutes from './routes/requests';
import guideRoutes from "./routes/guides";
import helperRoutes from "./routes/helpers";

// import passport config
import './config/passport';

// load env
dotenv.config();

// app and port initialisation
const app = express();
const PORT = process.env.PORT || 5000;

// allowed origins for CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://open-setup.vercel.app",
];

// CORS configuration
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('Connected to MongoDB successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());

// Set up encrypted cookie session storage
app.use(
    cookieSession({
        name: 'session',
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY!]
    })
);

// Passport compatibility middleware for cookie-session
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb: any) => {
            if (cb) cb();
            return req.session;
        };
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb: any) => {
            if (cb) cb();
            return req.session;
        };
    }
    next();
});

// Initialize Passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Register API Routes
app.use('/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/guides', helperRoutes);

// Server check endpoint
app.get('/', (req, res) => {
    res.send({ status: 'Online', engine: 'v2.4.0-stable' });
});

app.listen(PORT, () => {
    console.log(`Server spinning up on http://localhost:${PORT}`);
});