const route = require("express").Router();
const {
  Signin,
  Login,
  checkLoggedIn,
  logOut,
} = require("../Controller/controller");
// const auth=require('../middleware/auth')
route.post("/Signin", Signin);

route.post("/login", Login);

route.get("/checkloggedin", checkLoggedIn);

route.get("/logout", logOut);

module.exports = route;
