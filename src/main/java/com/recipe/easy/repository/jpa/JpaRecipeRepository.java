package com.recipe.easy.repository.jpa;


import com.recipe.easy.model.Recipe;
import com.recipe.easy.model.wrapper.RecipeIngredientWrapper;

public interface JpaRecipeRepository {

    Recipe saveNewRecipe(RecipeIngredientWrapper newRecipe);
}
