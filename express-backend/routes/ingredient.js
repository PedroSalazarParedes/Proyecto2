"use strict";
const Router = require("express");

const router = Router();


/*POST ingredient*/


router.post("/", (req, res) => {
  // this is a template string
  const postQuery = `MERGE (ing:Ingredient ${req.body}) RETURN ing.name`; //lets assume that ingredients have names

  //TODO el query de verdad

  query(postQuery).then(data => res.json(data));
  

});


/* GET ingredients listing. */
router.get("/", (req, res) => {

  const getQuery = `MATCH (:Recipe {name:"${req.params.recipeName}"}) --> (ing:Ingredient) RETURN ing `;

  query(getQuery).then(data => res.json(data));


  //TODO el query de verdad execQuery( "users", {}, ( users ) => res.send( users ) );
});

export default router;
