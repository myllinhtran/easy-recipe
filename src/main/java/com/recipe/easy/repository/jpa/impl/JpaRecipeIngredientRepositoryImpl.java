package com.recipe.easy.repository.jpa.impl;

import com.recipe.easy.model.Ingredient;
import com.recipe.easy.model.Recipe;
import com.recipe.easy.model.RecipeIngredient;
import com.recipe.easy.model.wrapper.IngredientWrapper;
import com.recipe.easy.model.wrapper.RecipeIngredientWrapper;
import com.recipe.easy.repository.jpa.JpaRecipeIngredientRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.*;


@Repository
public class JpaRecipeIngredientRepositoryImpl implements JpaRecipeIngredientRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public RecipeIngredientWrapper getCompleteRecipeById(Long recipeId) {
        Query query = this.entityManager
                .createQuery("SELECT recipe " +
                             "FROM Recipe recipe JOIN RecipeIngredient recipeIngredient " +
                             "ON recipe.id=recipeIngredient.recipe.id " +
                             "WHERE recipeIngredient.recipe.id=:recipeId");
        query.setParameter("recipeId", recipeId);

        Recipe recipe = ( Recipe ) query.getSingleResult();

        RecipeIngredientWrapper newRecipe = new RecipeIngredientWrapper();
        newRecipe.setId(recipe.getId());
        newRecipe.setTitle(recipe.getTitle());
        newRecipe.setMeal(recipe.getMeal());
        newRecipe.setDifficulty(recipe.getDifficulty());
        newRecipe.setSteps(recipe.getSteps());

        Set<RecipeIngredient> recipeIngredients = recipe.getRecipeIngredients();
        Set<IngredientWrapper> ingredientWrappers = new HashSet<>();
        for (RecipeIngredient recipeIngredient : recipeIngredients) {
            IngredientWrapper ingredientWrapper = new IngredientWrapper();

            ingredientWrapper.setId(recipeIngredient.getRecipeIngredientId().getIngredientId());
            ingredientWrapper.setName(recipeIngredient.getIngredient().getName());
            ingredientWrapper.setAmount(recipeIngredient.getAmount());
            ingredientWrapper.setUnit(recipeIngredient.getUnit());

            ingredientWrappers.add(ingredientWrapper);
        }
        newRecipe.setIngredientSet(ingredientWrappers);

        return newRecipe;
    }
}
