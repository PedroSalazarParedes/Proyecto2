"use strict";
const Router = require("express");

const router = Router();


/*POST step*/


router.post("/", (req, res) => {
  // this is a template string
  const postQuery = `MERGE (step:Step ${req.body}) RETURN step.name`; //lets assume that steps have names

  //TODO el query de verdad

  query(postQuery).then(data => res.json(data));
  

});


/* GET steps listing. */
router.get("/", (req, res) => {

  const getQuery = `MATCH (:Recipe {name:"${req.params.recipeName}"}) --> (ing:Ingredient) RETURN ing `;

  query(getQuery).then(data => res.json(data));


  //TODO el query de verdad execQuery( "users", {}, ( users ) => res.send( users ) );
});

export default router;
