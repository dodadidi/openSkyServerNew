const passport = require('passport')
const { Router } = require('express');
const authRouter = new Router();
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

// when login is successful, retrieve user info
authRouter.get("/login/success", (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});

// when login failed, send failed msg
authRouter.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

// When logout, redirect to client
authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with google+
authRouter.get("/google", passport.authenticate("google",  {scope: 'https://www.googleapis.com/auth/plus.login'}));

// callback route for google to redirect to
authRouter.get("/google/redirect",
    passport.authenticate("google", {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: "/auth/login/failed"
    })
);

module.exports = { authRouter }
