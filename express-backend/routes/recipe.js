"use strict";
const Router = require("express");
const router = Router();
const { execGraphQuery } = require("../consts");




/* POST recipe */
router.post("/", (req, res) => {
  // this is a template string
  // los pasos(y sus ingredientes/herramientas) ingredientes viajan en el body o qué??
  const postQuery = `MERGE (res:Recipe {${req.body}}) RETURN res.name`; //lets assume that recipes have names

  //TODO el query de verdad Necesito saber el formato de la petición para poder crear la receta, los ingredientes ya existen?

  query(postQuery).then(data => res.json(data));

});


/* GET speciffic recipe */

/* GET all recipes */
// Me parece mejor que el get all de las recetas pero no sus subnodos y si algo que pidan los detalles
// Toca pensar en la paginación 
router.get("/all", (req, res) => {
  const getAllQuery = `MATCH (res:Recipe) RETURN res`;

  execGraphQuery(getAllQuery, {})
    .then(data => res.send(data.records));
});

router.get('/:title', (req, res) => {
  const query = `MATCH p=(res:Recipe {title: {title} }) -[rel]-> (end) RETURN p`;
  
  execGraphQuery(query, { title: req.params.title })
    .then(data => res.send(data.records));
});

module.exports = router;
