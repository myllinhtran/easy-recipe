package com.recipe.easy.model;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

import java.util.HashSet;
import java.util.Set;


@DisplayNameGeneration(value = DisplayNameGenerator.ReplaceUnderscores.class)
class IngredientShould {

    private Recipe recipe = new Recipe();
    private Ingredient ingredient = new Ingredient();
    private RecipeIngredient recipeIngredient = new RecipeIngredient();
    private Set<RecipeIngredient> recipeIngredients = new HashSet<>();

    @BeforeEach
    void setUp() {
        recipe.setId(( long ) 01);
        recipe.setTitle("Test");
        recipe.setMeal("Test");
        recipe.setDifficulty("Test");
        recipe.setSteps("Test");

        ingredient.setId(( long ) 01);
        ingredient.setName("banana");

        recipeIngredient.setRecipe(recipe);
        recipeIngredient.setIngredient(ingredient);
        recipeIngredient.setAmount(0.0);
        recipeIngredient.setUnit("Test");

        recipeIngredients.add(recipeIngredient);

        recipe.setRecipeIngredients(recipeIngredients);
        ingredient.setRecipeIngredients(recipeIngredients);
    }

    @Test
    void have_all_fields_set() {
        assertThat(ingredient.getId()).isNotNull();
        assertThat(ingredient.getName()).isNotNull();
        assertThat(ingredient.getRecipeIngredients()).isNotNull();
    }

    @Test
    void have_complete_data() {
        assertThat(ingredient).extracting("id", "name").containsExactly(1L, "banana");
        assertThat(ingredient).extracting(Ingredient::getName).as("Ingredient's name should not be null").isNotNull();
        assertThat(ingredient).extracting(Ingredient::getName, as(InstanceOfAssertFactories.STRING))
                .isNotNull().isNotBlank().isNotEmpty()
                .startsWith("banana");
    }
}
