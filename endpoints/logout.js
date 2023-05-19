const express = require("express");
require("cookie-session");
const router = express.Router();

const PORT = process.env.PORT || 3000;
const CAS_URL = "https://fed.princeton.edu/cas/";
const BASE_LOGOUT_URL = `http://localhost:${PORT}`;

// some helper functions here

// Logs out of the application
router.get("/app", async (req, res) => {
    try {
        req.session = null;
        res.sendFile("loggedout.html", {root: "."});
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Server error in logging out of app!");
    }
});

// Logs out of the application and CAS session
router.get("/cas", async (req, res) => {
    try {
        req.session = null;
        res.redirect(CAS_URL + "logout?service=" +  BASE_LOGOUT_URL + "/logout/display");
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Server error in logging out of app & CAS!");
    }
});

// Rendered html page (loggedoutcas.html)
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