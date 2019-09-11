/* eslint-disable no-undef,no-unused-vars */
"use strict";
import { Router } from "express";
const router = Router( {} );

/* GET home page. */
router.get( "/", ( req, res, next ) => {
  res.send("App running...");
} );

export default router;
