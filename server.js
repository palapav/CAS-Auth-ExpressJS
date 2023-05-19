// convert everything to CommonJS later (standard node syntax)

const express = require("express");
let cookies = require("cookie-session");
const login = require("./endpoints/login.js");
const logout = require("./endpoints/logout.js");


const app = express();
app.set("view engine", "ejs");
const port = process.env.PORT || 3000;

// not using middleware here -> check to see if we need to
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

// may need to enable cors here in a deployed/more sophisticated server


// defining routes
app.use("/login", login);
app.use("/logout", logout);

// switch back to 
app.get('/', (req, res) => {
  if (req.session.cas) {
    console.log("I shouldn't be here because I logged out of the app");
    const netid = req.session.cas.netid;
    res.render("authenticated", {netid: netid});
    return;
  }

  res.sendFile(__dirname + "/index.html");
});

app.get('/logout/cas', (req, res) => {
  res.send("You have been logged out of CAS and the app")
});

// need cors?



app.use((err, _req, res, next) => {
  console.log(err);
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});