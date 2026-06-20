// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import dotenv from 'dotenv';

// import routes
import authRoutes from './routes/auth';

// import passport config
import './config/passport';

// load env
dotenv.config();

// app and port initialisation
const app = express();
const PORT = process.env.PORT || 5000;

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

// Initialize Passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Register API Routes
app.use('/auth', authRoutes);

// Server check endpoint
app.get('/', (req, res) => {
    res.send({ status: 'Online', engine: 'v2.4.0-stable' });
});

app.listen(PORT, () => {
    console.log(`Server spinning up on http://localhost:${PORT}`);
});