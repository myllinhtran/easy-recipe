package com.recipe.easy.controller;

import com.recipe.easy.model.Ingredient;
import com.recipe.easy.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.Collection;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping(path = "/ingredients")
    public Collection<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @GetMapping(path = "/ingredients/{ingredientId}")
    public Optional<Ingredient> getIngredientById(@PathVariable("ingredientId") Long id) {
        return ingredientRepository.findById(id);
    }

    @PostMapping(path = "/ingredients")
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    @PutMapping(path = "/ingredients")
    public Ingredient editIngredient(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    @DeleteMapping(path = "/ingredients/{ingredientId}")
    public String deleteIngredient(@PathVariable("ingredientId") Long id) {
        ingredientRepository.deleteById(id);
        return MessageFormat.format("Ingredient with ID {0} has been deleted.", id);
    }
}
