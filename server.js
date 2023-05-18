// convert everything to CommonJS later (standard node syntax)

import express from "express";
import login from "./endpoints/login.js";
import logout from "./endpoints/logout.js";
import { dirname } from "path";


const app = express();
const port = 3001;

// defining routes
app.use("/", login);
app.use("/logout", logout);

// switch back to 
app.get('/', (req, res) => {
  // console.log("I'm here " + dirname("index.html"));
  res.sendFile("/index.html", {root: "."});
});

app.get('/login', (req, res) => {
  res.send("This is the authenticated interface" +
   "that displays your username")
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