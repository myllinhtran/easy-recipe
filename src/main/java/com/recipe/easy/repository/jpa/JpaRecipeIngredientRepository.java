package com.recipe.easy.repository.jpa;


import com.recipe.easy.model.wrapper.RecipeIngredientWrapper;


public interface JpaRecipeIngredientRepository {

    RecipeIngredientWrapper getCompleteRecipeById(Long recipeId);
}
