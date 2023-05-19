const express = require("express");
// create typescript declaration file -> once program is done
const CAS = require("cas");
require("cookie-session");
const router = express.Router();


// some helper functions here
// access control: restriction to certain endpoints?
// focus on application

const PORT = process.env.PORT || 3000;
// may need to modularize above line of code

// removed last slash mark at end of CAS_URL
const CAS_URL = "https://fed.princeton.edu/cas";
const BASE_LOGIN_URL = `http://localhost:${PORT}/login/verify`;
let cas = new CAS({base_url: CAS_URL, service: BASE_LOGIN_URL});


// redirects user to Princeton's CAS server
router.get("/cas", async (req, res) => {
    // try catch block
    console.log("I'm in the login endpoint");

    // first need to check if we have a validated CAS ticket in our cookie session
    // if we do (never logged out) -> continue to authenticated interface
    // if not redirect to cas

    // also no need to store username in cookies -> just ticket -> username only rendered
    // in one state of the application
    
    // this does the automatic logging in for me if needed
    res.redirect(CAS_URL + '/login?service=' + BASE_LOGIN_URL);
    // if we don't define the next route -> it would just go the next sequence in the endpoints
    return;
});



router.get("/verify", async (req, res) => {
    console.log("I'm in the /login/verify endpoint'");
    const ticket = req.query.ticket;

    if (typeof(ticket) === undefined) {
        // redirect to unauthenticated interface (welcome screen withn no username)
        // bolster this later
        res.redirect("/");
    }

    if (req.session.casSession) {

    }

    else {
        // we are ready to validate the ticket
        console.log("This is my ticket yay: " + ticket);
        
        // may modularize later after cookie storage
        // ticket validation here!
        await cas.validate(ticket, function(err, status, netid) {
            console.log("netid: " + netid);
            if (err) {
                // handles error in case ticket is invalidated
                // add status error
                console.log(JSON.stringify(err));
                res.send({error: err}).status(500);
                return;
            }
            console.log("This is my username post ticket valid: " + netid);
            // log the user in (extract authenticated username)
            // no need for netid to be stored in cookies -> only ticket (between many states)
            req.session.casSession = {
                ticket: ticket,
                username: netid
            };
            console.log("Cookie-session" + JSON.stringify(req.session));
            res.send({status: status, netid: netid}).status(200);
        });
    }
});

// another router here -> handle replies from Princeton's CAS server
// about authentication -> here we will get the ticket

module.exports = router;