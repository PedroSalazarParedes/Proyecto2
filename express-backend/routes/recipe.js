"use strict";
import { Router } from "express";
import { no4jsQuery } from "../consts";

const router = Router();


/*POST recipe*/


router.post("/", (req, res) => {
  // this is a template string
  //
  const postQuery = `MERGE (res:Recipe {${req.body}}) RETURN res.name`; //lets assume that recipes have names

  //TODO el query de verdad Necesito saber el formato de la petición para poder crear la receta, los ingredientes ya existen?

  query(postQuery).then(data => res.json(data));
  

});


/* GET ingredients listing. */
router.get("/", (req, res) => {
  const ingerients = ["a", "b", "c"];
  const getQuery = `MATCH p=(res:Recipe {name:"${name}"})-->(ing:Ingredient) 
  WHERE ALL (x IN nodes(p) WHERE ing.name IN ${ingerients})
  RETURN res`;

  query(getQuery).then(data => res.json(data));


  //TODO el query de verdad execQuery( "users", {}, ( users ) => res.send( users ) );
});

export default router;
