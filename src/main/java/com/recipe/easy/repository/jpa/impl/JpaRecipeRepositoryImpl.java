package com.recipe.easy.repository.jpa.impl;

import com.recipe.easy.model.*;
import com.recipe.easy.model.wrapper.IngredientWrapper;
import com.recipe.easy.model.wrapper.RecipeIngredientWrapper;
import com.recipe.easy.repository.jpa.JpaRecipeRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Repository
public class JpaRecipeRepositoryImpl implements JpaRecipeRepository {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    @Transactional
    public Recipe saveNewRecipe(RecipeIngredientWrapper newRecipe) {
        Recipe recipe = new Recipe();
        recipe.setId(newRecipe.getId());
        recipe.setTitle(newRecipe.getTitle());
        recipe.setMeal(newRecipe.getMeal());
        recipe.setDifficulty(newRecipe.getDifficulty());
        recipe.setSteps(newRecipe.getSteps());

        entityManager.persist(recipe);

        for (IngredientWrapper ingredient : newRecipe.getIngredientSet()) {
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setAmount(ingredient.getAmount());
            recipeIngredient.setUnit(ingredient.getUnit());
            recipeIngredient.setRecipe(recipe);

            Ingredient newIngredient = new Ingredient();
            newIngredient.setId(ingredient.getId());
            newIngredient.setName(ingredient.getName());
            recipeIngredient.setIngredient(newIngredient);

            entityManager.merge(recipeIngredient);
        }
        return recipe;
    }

    @Override
    @Transactional
    public Recipe editCurrentRecipe(RecipeIngredientWrapper newRecipe, Long recipeId) {
        Recipe previousRecipe = entityManager.find(Recipe.class, recipeId);
        entityManager.remove(previousRecipe);

        Recipe recipe = new Recipe();
        recipe.setId(recipeId);
        recipe.setTitle(newRecipe.getTitle());
        recipe.setMeal(newRecipe.getMeal());
        recipe.setDifficulty(newRecipe.getDifficulty());
        recipe.setSteps(newRecipe.getSteps());

        entityManager.persist(recipe);

        for (IngredientWrapper ingredient : newRecipe.getIngredientSet()) {
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setAmount(ingredient.getAmount());
            recipeIngredient.setUnit(ingredient.getUnit());
            recipeIngredient.setRecipe(recipe);

            Ingredient newIngredient = new Ingredient();
            newIngredient.setId(ingredient.getId());
            newIngredient.setName(ingredient.getName());
            recipeIngredient.setIngredient(newIngredient);

            entityManager.merge(recipeIngredient);
        }
        return recipe;
    }
}
