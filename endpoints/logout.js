/* 
logout.js
Author: Aditya Palaparthi
*/

// importing necessary packages & values
const express = require("express");
require("cookie-session");
const verifyPort = require("../argparser");
const PORT = verifyPort(process.argv[2]);
const router = express.Router();
const CAS_URL = "https://fed.princeton.edu/cas/";
const BASE_LOGOUT_URL = `http://localhost:${PORT}`;


// Logs out of only the application (deletes session data
// and ticket revalidation needed upon logging in)
router.get("/app", async (req, res) => {
    try {
        // delete cookie session data
        req.session = null;
        res.sendFile("loggedout.html", {root: "."});
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Server error in logging out of app!");
    }
});

// Logs out of the application and CAS session (need to 
// authenticate with Princeton CAS server upon logging in)
router.get("/cas", async (req, res) => {
    try {
        // delete cookie session data
        req.session = null;
        res.redirect(CAS_URL + "logout?service=" +  BASE_LOGOUT_URL + "/logout/display");
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Server error in logging out of app & CAS!");
    }
});

// Rendered html page (loggedoutcas.html) for logging out of app & CAS
// upon receiving logout reply from Princeton's CAS server
router.get("/display", async(req, res) => {
    try {
        res.sendFile("loggedoutcas.html", {root: "."});
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Server error in logging out of app & CAS!");
    }
});

module.exports = router;