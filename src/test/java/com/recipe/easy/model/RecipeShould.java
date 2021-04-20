package com.recipe.easy.model;

import org.assertj.core.api.InstanceOfAssertFactories;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.mockito.internal.matchers.InstanceOf;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.*;


@DisplayNameGeneration(value = DisplayNameGenerator.ReplaceUnderscores.class)
class RecipeShould {

    private Recipe recipe = new Recipe();
    private Ingredient ingredient = new Ingredient();
    private RecipeIngredient recipeIngredient = new RecipeIngredient();
    private Set<RecipeIngredient> recipeIngredients = new HashSet<>();

    @BeforeEach
    void setUp() {
        recipe.setId(( long ) 01);
        recipe.setTitle("title");
        recipe.setMeal("meal");
        recipe.setDifficulty("difficulty");
        recipe.setSteps("steps");

        ingredient.setId(( long ) 01);
        ingredient.setName("banana");

        recipeIngredient.setRecipe(recipe);
        recipeIngredient.setIngredient(ingredient);
        recipeIngredient.setAmount(0.0);
        recipeIngredient.setUnit("unit");

        recipeIngredients.add(recipeIngredient);

        recipe.setRecipeIngredients(recipeIngredients);
        ingredient.setRecipeIngredients(recipeIngredients);
    }

    @Test
    void have_all_fields_set() {
        assertThat(recipe.getId()).isNotNull();
        assertThat(recipe.getTitle()).isNotNull();
        assertThat(recipe.getMeal()).isNotNull();
        assertThat(recipe.getDifficulty()).isNotNull();
        assertThat(recipe.getRecipeIngredients()).isNotNull();
        assertThat(recipe.getSteps()).isNotNull();
    }

    @Test
    void have_complete_data() {
        assertThat(recipe).extracting("id", "title", "meal", "difficulty", "steps")
                .containsExactly(1L, "title", "meal", "difficulty", "steps");

        assertThat(recipe).extracting(Recipe::getTitle).as("Title should not be null").isNotNull();
        assertThat(recipe).extracting(Recipe::getMeal).as("Meal should not be null").isNotNull();
        assertThat(recipe).extracting(Recipe::getDifficulty).as("Difficulty should not be null").isNotNull();
        assertThat(recipe).extracting(Recipe::getSteps).as("Steps should not be null").isNotNull();

        assertThat(recipe).extracting(Recipe::getTitle, as(InstanceOfAssertFactories.STRING))
                .isNotNull().isNotBlank().isNotEmpty();
        assertThat(recipe).extracting(Recipe::getMeal, as(InstanceOfAssertFactories.STRING))
                .isNotNull().isNotBlank().isNotEmpty();
        assertThat(recipe).extracting(Recipe::getDifficulty, as(InstanceOfAssertFactories.STRING))
                .isNotNull().isNotBlank().isNotEmpty();
    }
}
