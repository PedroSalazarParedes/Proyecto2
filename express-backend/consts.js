/* eslint-disable no-undef,no-unused-vars */
"use strict";
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const neo4j = require('neo4j-driver').v1;


const url = process.env.MOGODB_URI; // Connection URL
const dbName = "hungryffDB"; // Database Name
const driver = neo4j.driver(process.env.GRAPHENEDB_BOLT_URL, neo4j.auth.basic(process.env.GRAPHENEDB_BOLT_USER, process.env.GRAPHENEDB_BOLT_PASSWORD))


const execGraphQuery = async (query, params) => {
  return new Promise((resolve, reject) => {
    driver.session()
      .run(query, params)
      .subscribe({
        onNext: resolve,
        onCompleted: () => session.close(),
        onError: reject
      });
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
