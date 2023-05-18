import express from "express";
// const cas = require("cas");
const router = express.Router();


// some helper functions here
// access control: restriction to certain endpoints?





router.get("/login", async (req, res) => {
    // try catch block
    console.log("I'm in the login endpoint");

    // at the end we can send a valid username to the frontend or some other error value
    // res.sendStatus(200);
    // you can send a different html file + requested parameters
    res.send("This is the authenticated interface" +
    " that displays your username").status(200);
});

export default router;