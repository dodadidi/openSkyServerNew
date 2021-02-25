const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {CLIENT_ID, CLIENT_SECRET} = require('../constants');

const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    User.findById(_id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
        //proxy: true
    },  (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    admin: "false",
                    username: profile.displayName,
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    picture: profile._json.picture
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);