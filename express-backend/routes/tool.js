"use strict";
const Router = require("express");
const router = Router();
const bodyParser = require("body-parser")
const {execGraphQuery} = require("../consts");

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true }));


/* POST tool */
router.post("/", (req, res) => {
  const postQuery = "MERGE (tool:Tool params) RETURN tool.name";
  execGraphQuery(postQuery, {params:req.body})  // el body parser manda un json
  .then(data => res.json(data))
  .catch(error =>  console.log(error));
});

/* GET tool by whatever*/
router.get("/", (req, res) => {
  const getByNameQuery = "MATCH (tool:Tool {body}) RETURN tool";
  execGraphQuery(getByNameQuery, {body: req.params})
  .then(data => res.json(data))
  .catch(error => console.log(error));
})

export default router;
