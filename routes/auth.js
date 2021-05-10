const express = require("express");
const userService = require("../services/member-service");
// const jwtAuth = require("../security/jwtAuth");

const router = express.Router();

router.post("", async (req, res, next) => {
   console.log("auth.js로 넘어옴");
   const user = req.body;
   console.log(user);
   
   
   res.end();
});

module.exports = router;