/* eslint-disable no-undef,no-unused-vars */
"use strict";
const express = require( "express" );
const router = express.Router( {} );

/* GET home page. */
router.get( "/", ( req, res, next ) => {
  res.send("App running...");
} );

module.exports = router;
