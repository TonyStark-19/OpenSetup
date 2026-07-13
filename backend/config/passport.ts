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
                // 1. Check if user already exists by googleId
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Extract email from profile
                const email = profile.emails && profile.emails[0]?.value;
                if (!email) {
                    return done(new Error('No email found in Google profile'), undefined);
                }

                // 2. Check if a user with this email already exists (registered via local signup)
                user = await User.findOne({ email: email.toLowerCase() });

                if (user) {
                    // Link the Google profile details to the existing account
                    user.googleId = profile.id;
                    if (!user.avatarUrl) {
                        user.avatarUrl = profile.photos && profile.photos[0]?.value;
                    }
                    await user.save();
                    return done(null, user);
                }

                // 3. If no account exists by googleId or email, create a new record
                const newUser = await new User({
                    googleId: profile.id,
                    email: email.toLowerCase(),
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