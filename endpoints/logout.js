import express from "express";
// const cas = require("cas");
const router = express.Router();


// some helper functions here

// logout of the app
// router.get("/app", async (req, res) => {
//     // try catch block
//     console.log("I'm in the logout/app endpoint");

//     // at the end we can send a valid username to the frontend or some other error value
//     res.sendStatus(200);
// });

// logout of app + cas
router.get("/cas", async (req, res) => {
    // try catch block
    console.log("I'm in the logout/cas endpoint");
    res.send("You have been logged out of CAS and the app").status(200);
    // at the end -> clear contents from cookie session
});

export default router;