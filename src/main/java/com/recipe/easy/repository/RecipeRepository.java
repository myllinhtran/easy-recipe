package com.recipe.easy.repository;

import com.recipe.easy.model.Recipe;
import com.recipe.easy.repository.jpa.JpaRecipeRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long>, JpaRecipeRepository {
}
