/* eslint-disable no-undef,no-unused-vars */
"use strict";
import { MongoClient } from "mongodb";
import { equal } from "assert";
import { v1 as neo4j } from "neo4j-driver";

const url = process.env.MOGODB_URI; // Connection URL
const dbName = "hungryffDB"; // Database Name
const driver = neo4j.driver(process.env.GRAPHENEDB_BOLT_URL, neoj4.auth.basic(process.env.GRAPHENEDB_BOLT_USER, process.env.GRAPHENEDB_BOLT_PASSWORD));




const execQuery = function ( collection_name, query, callback, limit ) {
  const createQuery = function ( db, collection_name, query = {}, callback, limit = 100 ) {
    db.collection( collection_name )
      .find( query )
      .limit( limit )
      .toArray( ( err, docs ) => {
        equal( err, null );
        console.log( `Found ${docs.length} records` );
        callback( docs );
      } );
  };

  MongoClient.connect( url, ( err, client ) => {
    equal( null, err );
    console.log( "Connected successfully to server" );
    createQuery( client.db( dbName ), collection_name, query, callback, limit );
    client.close();
  } );
};

export default {
  execQuery
};
