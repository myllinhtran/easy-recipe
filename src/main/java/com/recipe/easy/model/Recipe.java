package com.recipe.easy.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "recipes", schema = "myrecipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "meal")
    private String meal;

    @NotNull
    @Column(name = "difficulty")
    private String difficulty;

    @NotNull
    @Column(name = "steps")
    private String steps;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "recipe-json")
    private Set<RecipeIngredient> recipeIngredients = new HashSet<>();

    public Recipe() {
    }

    public Recipe(String title, String meal, String difficulty, String steps) {
        this.title = title;
        this.meal = meal;
        this.difficulty = difficulty;
        this.steps = steps;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMeal() {
        return meal;
    }

    public void setMeal(String meal) {
        this.meal = meal;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

    public Set<RecipeIngredient> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(Set<RecipeIngredient> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    @Override
    public String toString() {
        return "Recipe{" +
               "id=" + id +
               ", title='" + title + '\'' +
               ", meal='" + meal + '\'' +
               ", difficulty='" + difficulty + '\'' +
               ", steps='" + steps + '\'' +
               ", recipeIngredients=" + recipeIngredients +
               '}';
    }
}
