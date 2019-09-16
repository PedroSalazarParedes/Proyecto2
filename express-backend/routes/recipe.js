"use strict";
const Router = require("express");
const router = Router();
const { execGraphQuery } = require("../consts");

router.use(Router.json())
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
  const query = `MATCH p=(res:Recipe {title: {title} }) -[rel *]-> (end) RETURN p`;

  execGraphQuery(query, { title: req.params.title })
    .then(data => res.send(data.records));
});

router.post('/search', (req, res) => {
  const ings = req.body.ingredients;
  const query = `
    MATCH (r:Recipe) -[*]-> (i:Ingredient)
    WITH r, [ing in COLLECT(DISTINCT i) | ing.name] as their, ["${ings.join('", "')}"] as mine
    WITH r,their, [x in mine WHERE x in their] as int
    WITH r, [x IN their WHERE NOT x IN int] as left
    WHERE SIZE(left) < 2
    RETURN r, SIZE(left)
  `;

  execGraphQuery(query, {})
    .then(data => res.send(data.records));
});

module.exports = router;
