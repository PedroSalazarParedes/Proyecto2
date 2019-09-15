/* eslint-disable no-undef,no-unused-vars */
"use strict";
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const neo4j = require('neo4j-driver').default;

// console.log(neo4j);

const url = process.env.MOGODB_URI; // Connection URL
const dbName = "hungryffDB"; // Database Name
const driver = neo4j.driver(
  process.env.GRAPHENEDB_BOLT_URL,
  neo4j.default.auth.basic(process.env.GRAPHENEDB_BOLT_USER, process.env.GRAPHENEDB_BOLT_PASSWORD),
  { disableLosslessIntegers: true }
)

const execGraphQuery = async (query, params) => {
  return new Promise((resolve, reject) => {
    const session = driver
      .session();
    session
      .run(query, params)
      .then(resolve)
      .catch(reject)
      .finally(() => session.close());
  });
};

const execQuery = function (collection_name, query, callback, limit) {
  const createQuery = function (db, collection_name, query = {}, callback, limit = 100) {
    db.collection(collection_name)
      .find(query)
      .limit(limit)
      .toArray((err, docs) => {
        assert.equal(err, null);
        console.log(`Found ${docs.length} records`);
        callback(docs);
      });
  };

  MongoClient.connect(url, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    createQuery(client.db(dbName), collection_name, query, callback, limit);
    client.close();
  });
};

module.exports = {
  execQuery,
  execGraphQuery
};
