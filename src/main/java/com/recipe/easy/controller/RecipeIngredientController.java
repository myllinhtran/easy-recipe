package com.recipe.easy.controller;

import com.recipe.easy.model.RecipeIngredient;
import com.recipe.easy.repository.RecipeIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;


@RestController
    @CrossOrigin(origins = "https://evening-scrubland-35769.herokuapp.com:3000/")
@RequestMapping(path = "/api")
public class RecipeIngredientController {

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping(path = "/my-recipes")
    public Collection<RecipeIngredient> getAllCompleteRecipes() {
        return recipeIngredientRepository.findAll();
    }

    @GetMapping(path = "/my-recipes/{id}")
    public Optional<RecipeIngredient> getCompleteRecipe(@PathVariable("id") Long id) {
        return recipeIngredientRepository.findById(id);
    }

    @PostMapping(path = "/my-recipes")
    public RecipeIngredient createCompleteRecipe(@RequestBody RecipeIngredient recipeIngredient) {
        return recipeIngredientRepository.save(recipeIngredient);
    }

    @PutMapping(path = "/my-recipes")
    public RecipeIngredient updateCompleteRecipe(@RequestBody RecipeIngredient recipeIngredient) {
        return recipeIngredientRepository.save(recipeIngredient);
    }

    @DeleteMapping(path = "/my-recipes/{id}")
    public void deleteRecipeIngredient(@PathVariable("id") Long id) {
        recipeIngredientRepository.deleteById(id);
    }
}
