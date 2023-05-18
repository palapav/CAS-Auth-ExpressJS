import express from "express";
import cas from "cas";
import cookieSession from "cookie-session";
const router = express.Router();


// some helper functions here
// access control: restriction to certain endpoints?
// focus on application

const PORT = process.env.PORT || 3000;
// may need to modularize above line of code

const CAS_URL = "https://fed.princeton.edu/cas/";
const BASE_URL = `http://localhost:${PORT}/login/verify`;

// stripping ticket function
function stripTicket(url) {

}

// validating ticket -> completed with cas
function validate(ticket) {

}

// redirects user to Princeton's CAS server
router.get("/cas", async (req, res) => {
    // try catch block
    console.log("I'm in the login endpoint");

    // first need to check if we have a validated CAS ticket in our cookie session
    // if we do (never logged out) -> continue to authenticated interface
    // if not redirect to cas

    // also no need to store username in cookies -> just ticket -> username only rendered
    // in one state of the application


    res.redirect(CAS_URL + 'login?service=' + BASE_URL);
    // if we don't define the next route -> it would just go the next sequence in the endpoints
    // at the end we can send a valid username to the frontend or some other error value
    // res.sendStatus(200);
    // you can send a different html file + requested parameters
    console.log("Will this ever be read?")
    // res.send("This is the authenticated interface" +
    // " that displays your username").status(200);
});

router.get("/verify", async (req, res) => {
    console.log("I want to be here please!");
    const ticket = req.query.ticket;
    console.log("This is my ticket yay" + ticket);
    // ticket validation will be in this step here!
    res.send("Please be here!")
});

// another router here -> handle replies from Princeton's CAS server
// about authentication -> here we will get the ticket

export default router;