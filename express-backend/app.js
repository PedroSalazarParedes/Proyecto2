/* eslint-disable no-undef,no-unused-vars */
"use strict";
import createError from "http-errors";
import express, { json, urlencoded, static } from "express";
import cors from "cors";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

app.use( logger( "dev" ) );
app.use( json() );
app.use( urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( static( join( __dirname, "front/build" ) ) );
app.use( cors( { origin: "http://localhost:3000" } ) );

// Routes
app.use( "/api", indexRouter );
app.use( "/api/users", usersRouter );

// catch 404 and forward to error handler
app.use( ( req, res, next ) => next( createError( 404 ) ) );

// error handler
app.use( ( err, req, res, next ) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get( "env" ) === "development" ? err : {};

  // render the error page
  res.status( err.status || 500 );
  res.send( "error" );
} );

export default app;
