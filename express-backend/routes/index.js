/* eslint-disable no-undef,no-unused-vars */
"use strict";
const Router = require("express");

const router = Router();

/* GET home page. */
router.get( "/", ( req, res, next ) => {
  res.send("App running...");
} );

module.exports = router;
