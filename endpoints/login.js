/* 
login.js
Author: Aditya Palaparthi
*/

// imported packages & values
const express = require("express");
const axios = require("axios");
const CAS = require("cas");
require("cookie-session");
const verifyPort = require("../argparser");
const PORT = verifyPort(process.argv[2]);

const router = express.Router();
const CAS_URL = "https://fed.princeton.edu/cas";
const BASE_URL = `http://localhost:${PORT}`;
const BASE_LOGIN_URL = BASE_URL + `/login/verify`;

// initializing the CAS service to be used in ticket validation
let cas = new CAS({base_url: CAS_URL, service: BASE_LOGIN_URL});



// redirects user to Princeton's CAS server in first step of authentication
router.get("/cas", async (req, res) => {
    try {
        res.redirect(CAS_URL + '/login?service=' + BASE_LOGIN_URL);
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Server error in redirecting to Princeton CAS!");
    }
});

// validates incoming tickets from Princeton's CAS server 
// or active CAS sessions prior to user arriving in the authenticated interface
router.get("/verify", async (req, res) => {
    try {
        const activeSession = req.session.cas;
        // skips ticket validation if user has never logged out of the app
        if (activeSession) {
            res.render("authenticated", {netid: activeSession.netid});
            return;
        }

        // if ticket is undefined, redirects to welcome page (index.html)
        const ticket = req.query.ticket;
        if (typeof(ticket) === undefined) {
            res.redirect("/");
        }
        else {
            val_url = CAS_URL + "/validate?service=" + BASE_URL + "/&ticket=" + ticket;
            await axios.get(val_url)
                .then((response) => {
                    console.log("ticket val data: " + JSON.stringify(response.data));
                })
                .catch((error) => {

                })
            // ticket is already stripped
            // await cas.validate(ticket, function(err, status, netid) {
            //     if (err) {
            //         // error handling for invalid tickets
            //         console.log("Error in cas validation: " + JSON.stringify(err));
            //         res.send({error: err}).status(500);
            //         return;
            //     }
            //     // add new cookie session data of ticket and netid (encrypted)
            //     req.session.cas = {
            //         ticket: ticket,
            //         netid: netid
            //     };

            //     // render authenticated interface with user netid
            //     res.render("authenticated", {netid: netid});
            // });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Server error in verifying ticket!");
    }
});

module.exports = router;