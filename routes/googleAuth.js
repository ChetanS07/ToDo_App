const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express()

const { register } = require('../controllers/userController')

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.BASE_URL + "/auth/google/success"
},
    function (accessToken, refreshToken, profile, cb) {
        cb(null, profile)
    }
));


app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/success', passport.authenticate('google', { failureRedirect: '/login' }), register);

module.exports = app