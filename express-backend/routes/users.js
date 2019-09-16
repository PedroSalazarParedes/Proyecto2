/* eslint-disable no-undef,no-unused-vars */
"use strict";
const express = require("express");
const router = express.Router();
const { execQuery } = require( "../consts" );

/* POST user auth */

router.post("/auth", (req, res) => {
  execQuery("users", {"username" : {$eq: req.body.username}}, data => res.send(data));
});


/* GET users listing. */
router.get("/",(req, res, next) => {
  execQuery( "users", {}, ( users ) => res.send( users ) );
});

module.exports = router;
