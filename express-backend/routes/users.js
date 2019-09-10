/* eslint-disable no-undef,no-unused-vars */
const express = require("express");
const router = express.Router();
const { execQuery } = require( "../consts" );

/* GET users listing. */
router.get("/", function(req, res, next) {
  execQuery( "users", {}, ( users ) => res.send( users ) );
});

module.exports = router;
