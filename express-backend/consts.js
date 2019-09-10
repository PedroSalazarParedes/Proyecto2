/* eslint-disable no-undef,no-unused-vars */
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017"; // Connection URL
const dbName = "test_db"; // Database Name

const execQuery = function ( collection_name, query, callback, limit ) {
  const createQuery = function ( db, collection_name, query = {}, callback, limit = 100 ) {
    db.collection( collection_name )
      .find( query )
      .limit( limit )
      .toArray( ( err, docs ) => {
        assert.equal( err, null );
        console.log( `Found ${docs.length} records` );
        callback( docs );
      } );
  };

  MongoClient.connect( url, ( err, client ) => {
    assert.equal( null, err );
    console.log( "Connected successfully to server" );
    createQuery( client.db( dbName ), collection_name, query, callback, limit );
    client.close();
  } );
};

module.exports = {
  execQuery
};
