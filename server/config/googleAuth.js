import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import process from 'process';
import User from '../models/user.js';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // If no user found with googleId, check if email exists
        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Update user with googleId if they signed up with email/password before
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create a new user if not found
            user = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
            });
            await user.save();
          }
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    console.log('Deserializing user with ID:', id);
    const user = await User.findById(id);
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (err) {
    console.error('Error during deserialization:', err);
    done(err, null);
  }
});
