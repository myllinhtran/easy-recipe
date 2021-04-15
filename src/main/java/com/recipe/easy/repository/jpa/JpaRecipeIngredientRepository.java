package com.recipe.easy.repository.jpa;


import com.recipe.easy.model.Ingredient;
import com.recipe.easy.model.Recipe;
import com.recipe.easy.model.wrapper.RecipeIngredientWrapper;


import java.util.Collection;


public interface JpaRecipeIngredientRepository {

    Collection<Ingredient> getAllIngredientsByRecipeId(Long recipeId);

    RecipeIngredientWrapper getCompleteRecipeById(Long recipeId);
}
