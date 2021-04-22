package com.recipe.easy;

import com.recipe.easy.model.Ingredient;
import com.recipe.easy.model.Recipe;
import com.recipe.easy.model.RecipeIngredient;
import com.recipe.easy.repository.IngredientRepository;
import com.recipe.easy.repository.RecipeRepository;
import com.recipe.easy.service.RecipeService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RecipeApplication {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private RecipeService recipeService;

    public static void main(String[] args) {
        SpringApplication.run(RecipeApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/").allowedOrigins("https://evening-scrubland-35769.herokuapp.com/");
            }
        };
    }

    // Uncomment this line to test
    // @Bean
    CommandLineRunner runner() {
        return args -> {
            Ingredient ingredient = new Ingredient();
            ingredient.setName("tomatoes");
            recipeService.saveIngredient(ingredient);

            Recipe recipe = new Recipe();
            recipe.setMeal("breakfast");
            recipe.setDifficulty("easy");
            recipe.setSteps("try something");
            recipe.setTitle("test title");
            recipeService.saveRecipe(recipe);

            RecipeIngredient recipeIngredient = new RecipeIngredient();
            recipeIngredient.setAmount(3.0);
            recipeIngredient.setUnit("u");
            recipeIngredient.setRecipe(recipe);
            recipeIngredient.setIngredient(ingredient);
            ingredient.getRecipeIngredients().add(recipeIngredient);
            recipe.getRecipeIngredients().add(recipeIngredient);
            recipeService.saveRecipeIngredient(recipeIngredient);
        };
    }
}
