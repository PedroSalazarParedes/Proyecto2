/* eslint-disable no-undef,no-unused-vars */
"use strict";
import { Router } from "express";
const router = Router();
import { execQuery } from "../consts";

/* GET users listing. */
router.get("/",(req, res, next) => {
  execQuery( "users", {}, ( users ) => res.send( users ) );
});

export default router;
