# HangryFF

## Objectives
Be able to search recipes from ingredients given, basically, "What I have in my fridge?" and what can we cook to have a healthy food.

## Technologies
* Node.js + Express [Backend]
* React.js [Frontend]
* MongoDB [Database - Auth]
* Neo4j [Database - Recipes*]

## Deployment
> I'ts important to have the API keys in the environment
* Install dependencies
  ```
    cd .\express-backend\
    npm install
    cd ..\react-frontend\
    npm install
  ```
* Run backend
  ```
    cd .\express-backend\
    npm start
  ```
* Run frontend
  ```
    cd .\react-frontend\
    npm start
  ```
  
## Running App
[HangryFF](https://hangryff.herokuapp.com)


## Data extracted from
[Spoonacular](http://spoonacular.com)

* [Get Random Recipes](https://api.spoonacular.com/recipes/random)
  ```
    GET https://api.spoonacular.com/recipes/random
  ```
* [Recipes Data](https://spoonacular.com/food-api/docs#Get-Analyzed-Recipe-Instructions)
  ```
    GET https://api.spoonacular.com/recipes/<recipe_id>/analyzedInstructions
  ```  
* [Get recipes with ingredients](https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients)
  ```
    GET https://api.spoonacular.com/recipes/findByIngredients?ingredients=<list_of_ingredients>
  ```
