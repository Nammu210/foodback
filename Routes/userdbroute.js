const { SigninUser, loginUser } = require("../Controller/userController");

const userdbroute=require("express").Router();

userdbroute.post("/Signin",SigninUser)
userdbroute.post('/login',loginUser)

module.exports=userdbroute