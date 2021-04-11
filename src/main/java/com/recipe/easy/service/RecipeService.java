package com.recipe.easy.service;

import com.recipe.easy.model.Ingredient;
import com.recipe.easy.model.Recipe;
import com.recipe.easy.model.RecipeIngredient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Service
public class RecipeService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void saveRecipe(Recipe recipe) {
        entityManager.persist(recipe);
    }

    @Transactional
    public void saveIngredient(Ingredient ingredient) {
        entityManager.persist(ingredient);
    }

    @Transactional
    public void saveRecipeIngredient(RecipeIngredient recipeIngredient) {
        entityManager.merge(recipeIngredient);
    }
}
