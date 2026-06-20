// import necessary dependencies
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

// import model
import { User } from '../models/User';

// load env
dotenv.config();

// Serialize user into the session (stores only the ID)
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user out of the session (fetches full user details via ID)
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// oauth
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists in DB
                let existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                }

                // If not, extract email and create a new record
                const email = profile.emails && profile.emails[0]?.value;
                if (!email) {
                    return done(new Error('No email found in Google profile'), undefined);
                }

                const newUser = await new User({
                    googleId: profile.id,
                    email: email,
                    displayName: profile.displayName,
                    avatarUrl: profile.photos && profile.photos[0]?.value
                }).save();

                done(null, newUser);
            } catch (err: any) {
                done(err, undefined);
            }
        }
    )
);