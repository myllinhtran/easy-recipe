package com.recipe.easy.controller;

import com.recipe.easy.model.Recipe;
import com.recipe.easy.model.RecipeIngredient;
import com.recipe.easy.model.wrapper.RecipeIngredientWrapper;
import com.recipe.easy.repository.RecipeIngredientRepository;
import com.recipe.easy.repository.RecipeRepository;
import com.recipe.easy.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.Collection;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping(path = "/recipes/{recipeId}")
    public @ResponseBody
    RecipeIngredientWrapper getCompleteRecipeById(@PathVariable("recipeId") Long recipeId) {
        return recipeIngredientRepository.getCompleteRecipeById(recipeId);
    }

    @GetMapping(path = "/recipes")
    public Collection<Recipe> findAllRecipes() {
        return recipeRepository.findAll();
    }

    @PostMapping(path = "/recipes")
    @ResponseBody
    public Recipe addRecipe(@RequestBody RecipeIngredientWrapper newRecipe) {
        return recipeRepository.saveNewRecipe(newRecipe);
    }

    @PutMapping(path = "/recipes")
    public Recipe editRecipe(@RequestBody Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    @DeleteMapping(path = "/recipes/{recipeId}")
    public String deleteRecipe(@PathVariable("recipeId") Long id) {
        recipeRepository.deleteById(id);
        return MessageFormat.format("Recipe with ID {0} has been deleted.", id);
    }
}
