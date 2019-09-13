"use strict";
const Router = require("express");
const router = Router();
const {execGraphQuery} = require("../consts");

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));

/* POST ingredient */
router.post("/", (req, res) => {
  const postQuery = "MERGE (ingredient:Ingredient params) RETURN ingredient.name"; //lets assume that ingredients have names
  execGraphQuery(postQuery, {params:req.body})  // el body parser manda un json
  .then(data => res.json(data))
  .catch(error =>  console.log(error));
});

/* GET tool by whatever*/
router.get("/", (req, res) => {
  const getByNameQuery = "MATCH (ingredient:Ingredient {body}) RETURN ingredient";
  execGraphQuery(getByNameQuery, {body: req.params})
  .then(data => res.json(data))
  .catch(error => console.log(error));
})

export default router;
