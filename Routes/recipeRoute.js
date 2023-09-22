const {
  bookRecipe,
  fetchSavedRecipe,

} = require("../Controller/RecipeFile");

const recipeRoute = require("express").Router();

recipeRoute.post("/saverecipe", bookRecipe);
recipeRoute.get("/fetchrecipe/:email", fetchSavedRecipe);


module.exports = recipeRoute;
