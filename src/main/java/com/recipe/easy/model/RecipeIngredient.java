package com.recipe.easy.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "recipe_ingredients", schema = "myrecipes")
public class RecipeIngredient {

    /*
        Composite key for the association table
     */
    @EmbeddedId
    private RecipeIngredientId recipeIngredientId = new RecipeIngredientId();

    @ManyToOne()
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id", nullable = false)
    // If use more than one JsonBackReference, must differentiate between them.
    @JsonBackReference(value = "recipe-json")
    private Recipe recipe;

    @ManyToOne()
    @MapsId("ingredientId")
    @JoinColumn(name = "ingredient_id", nullable = false)
    @JsonBackReference(value = "ingredient-json")
    private Ingredient ingredient;

    @NotNull
    @Column(name = "amount")
    private Double amount;

    @NotNull
    @Column(name = "unit")
    private String unit;

    public RecipeIngredient() {
    }

    public RecipeIngredient(RecipeIngredientId recipeIngredientId, Recipe recipe, Ingredient ingredient, Double amount, String unit) {
        this.recipeIngredientId = recipeIngredientId;
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.amount = amount;
        this.unit = unit;
    }

    public RecipeIngredient(Recipe recipe, Ingredient ingredient, Double amount, String unit) {
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.amount = amount;
        this.unit = unit;
    }

    public RecipeIngredientId getRecipeIngredientId() {
        return recipeIngredientId;
    }

    public void setRecipeIngredientId(RecipeIngredientId recipeIngredientId) {
        this.recipeIngredientId = recipeIngredientId;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @Override
    public String toString() {
        return "RecipeIngredient{" +
               "recipeIngredientId=" + recipeIngredientId +
               ", recipe=" + recipe +
               ", ingredient=" + ingredient +
               ", amount=" + amount +
               ", unit='" + unit + '\'' +
               '}';
    }
}
