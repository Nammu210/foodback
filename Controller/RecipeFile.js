
const recipeSaves = require("../modelSchema/recipeSchema")

const bookRecipe = async (req, res) => {
  const data = req.body;

  try {
    const user = await recipeSaves.findOne({ email: data.email });
    
    if (!user) {
      console.log("inside not user");
      const newUser = new recipeSaves({
        email: data.email,
        saved: [
          {
            recipe: data.recipe,
          },
        ],
      });

      const result = await newUser.save();
      return res.send(result);
    }
    
    const existingRecipe = user.saved.find((savedItem) => {
      return savedItem.recipe.some(
        (recipeItem) => recipeItem.label === data.recipe.label
      );
    });

    // console.log(existingRecipe);
    if (existingRecipe) {
  
      return res.status(204).send("Recipe has already been saved");
    }

    // Push the new recipe to the saves array
    user.saved.push({
      recipe: data.recipe,
    });

    // Save the updated user document
    const result = await user.save();

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(409).send("Unable to save recipe");
  }
};

const fetchSavedRecipe = async (req, res) => {
  const email = req.params.email;
  // console.log(email);
  const userRecipe = await recipeSaves.findOne({ email: email });
  res.send({
    userRecipe: userRecipe,
  });
};







module.exports = {
  bookRecipe,
 
  fetchSavedRecipe,
 
};