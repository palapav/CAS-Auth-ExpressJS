/*
server.js
Author: Aditya Palaparthi
*/

// importing necessary packages
const express = require("express");
let cookies = require("cookie-session");
const login = require("./endpoints/login.js");
const logout = require("./endpoints/logout.js");
const verifyPort = require("./argparser.js");


const app = express();
// allows for ejs template engine to integrate with Express
// used in login endpoints and authenticated.ejs
app.set("view engine", "ejs");

// process.argv[2] represents the port argument inserted by user
// in command line
const port = verifyPort(process.argv[2]);

app.use(cookies({
  name: "session",
  /* 
  NOTE:
  Developer needs to add pseudorandom and secure signing
  and verifying keys for cookie session data prior to deploying
  CAS Authentication -> below keys are placeholder values
  SECRET_SIGN_KEY -> Encrypting cookie data prior to
  sending cookies to client
  SECRET_VERIFY_KEY -> Decrypting cookie data 
  on server side
  */
  keys: ['SECRET_SIGN_KEY', 'SECRET_VERIFY_KEY']
}));

// may need to enable an Express CORS package
// here in a deployed/more sophisticated server

// defining routes
app.use("/login", login);
app.use("/logout", logout);

// Renders authenticated or welcome page depending on whether
// user is logged in
app.get('/', (req, res) => {
  if (req.session.cas) {
    // cas cookie session still active (user never logged out)
    const netid = req.session.cas.netid;
    res.render("authenticated", {netid: netid});
    return;
  }

  res.sendFile(__dirname + "/index.html");
});

// highest level of server side error handling
app.use((err, _req, res, next) => {
  console.log(err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
