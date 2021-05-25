const passport = require("passport");
const googleStrategy = require("passport-google-oauth2").Strategy;
const bcrypt = require('bcrypt');

const User = require("../models/userModel");

// clientID:
//         "196975848011-34l5lp49oaldkc2uug0k6nmtbfris5ku.apps.googleusercontent.com",
//       clientSecret: "AjYVuJXZwgWaDxiFl3mWVdRV",

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new googleStrategy(
        {
            clientID: process.env.GoogleClientID,
            clientSecret: process.env.GoogleClientSecret,
            callbackURL: "http://localhost:8000/users/google/callback",
        },

        function (accessToken, refreshToken, profile, done) {
            console.log("profile", profile.emails[0].value);
            User.findOne({ email: profile.emails[0].value }).exec(async function (
                err,
                user
            ) {
                if (err) {
                    console.log("error in google strategy passport", err);
                    return;
                }
                console.log(profile);
                if (user) {
                    return done(null, user);
                } else {
                    //Encrypting passwords
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(profile.emails[0].value, salt);
                    User.create(
                        {
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: hashedPassword,
                        },
                        function (err, user) {
                            if (err) {
                                console.log("error in creating user strategy ", err);
                                return;
                            } else {
                                return done(null, user);
                            }
                        }
                    );
                }
            });
        }
    )
);

module.exports = passport;
