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
    @SuppressWarnings("unchecked")
    public Collection<Ingredient> getAllIngredientsByRecipeId(Long recipeId) {
        Query query = this.entityManager
                .createQuery("SELECT ingredient FROM Ingredient ingredient WHERE ingredient.id IN " +
                             "(SELECT ingredient.id FROM Ingredient ingredient JOIN RecipeIngredient recipeIngredient " +
                             "ON ingredient.id=recipeIngredient.ingredient.id WHERE recipeIngredient.recipe.id=:recipeId)");
        query.setParameter("recipeId", recipeId);
        return query.getResultList();
    }

    @Override
    public RecipeIngredientWrapper getCompleteRecipeById(Long recipeId) {
        Query query = this.entityManager
                .createQuery("SELECT recipe " +
                             "FROM Recipe recipe JOIN RecipeIngredient recipeIngredient ON recipe.id=recipeIngredient.recipe.id " +
                             "WHERE recipeIngredient.recipe.id=:recipeId");
        query.setParameter("recipeId", recipeId);

        Recipe recipe = ( Recipe ) query.getSingleResult();

        RecipeIngredientWrapper recipeWrapper = new RecipeIngredientWrapper();
        recipeWrapper.setId(recipe.getId());
        recipeWrapper.setTitle(recipe.getTitle());
        recipeWrapper.setMeal(recipe.getMeal());
        recipeWrapper.setDifficulty(recipe.getDifficulty());
        recipeWrapper.setSteps(recipe.getSteps());

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
        recipeWrapper.setIngredientSet(ingredientWrappers);

        return recipeWrapper;
    }
}
