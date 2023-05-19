const express = require("express");
require("cookie-session");
// const cas = require("cas");
const router = express.Router();

// may need to modularize variable names in a separate backend file
// where all files have access to them

const PORT = process.env.PORT || 3000;
// may need to modularize above line of code

// removed last slash mark at end of CAS_URL
const CAS_URL = "https://fed.princeton.edu/cas/";
const BASE_LOGOUT_URL = `http://localhost:${PORT}/`;
// maybe have it take you back to a logout page

// some helper functions here

// logout of the app
router.get("/app", async (req, res) => {
    // try catch block
    console.log("I'm in the logout/app endpoint");

    req.session = null;

    // at the end we can send a valid username to the frontend or some other error value
    res.sendStatus(200);
});

// logout of app + cas
router.get("/cas", async (req, res) => {
    // try catch block
    console.log("I'm in the logout/cas endpoint");
    console.log("Cookie-session: " + JSON.stringify(req.session));
    // req.casSession = null;
    // we should have it redirect to logout page with button to homepage
    req.session = null;
    res.redirect(CAS_URL + "logout?service=" +  BASE_LOGOUT_URL);
    res.status(200);
    return;
});

module.exports = router;