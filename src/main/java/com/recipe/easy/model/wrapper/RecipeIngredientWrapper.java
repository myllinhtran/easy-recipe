package com.recipe.easy.model.wrapper;

import com.recipe.easy.model.wrapper.IngredientWrapper;
import com.sun.istack.NotNull;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.List;
import java.util.Set;


public class RecipeIngredientWrapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String meal;

    private String difficulty;

    private String steps;

    private Set<IngredientWrapper> ingredientSet;

    public RecipeIngredientWrapper() {
    }

    public RecipeIngredientWrapper(Long id, String title, String meal, String difficulty, String steps, Set<IngredientWrapper> ingredientSet) {
        this.id = id;
        this.title = title;
        this.meal = meal;
        this.difficulty = difficulty;
        this.steps = steps;
        this.ingredientSet = ingredientSet;
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

    public Set<IngredientWrapper> getIngredientSet() {
        return ingredientSet;
    }

    public void setIngredientSet(Set<IngredientWrapper> ingredientSet) {
        this.ingredientSet = ingredientSet;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }

    @Override
    public String toString() {
        return "RecipeIngredientWrapper{" +
               "id=" + id +
               ", title='" + title + '\'' +
               ", meal='" + meal + '\'' +
               ", difficulty='" + difficulty + '\'' +
               ", ingredientSet=" + ingredientSet +
               '}';
    }
}
