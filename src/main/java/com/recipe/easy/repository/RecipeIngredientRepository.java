package com.recipe.easy.repository;

import com.recipe.easy.model.RecipeIngredient;
import com.recipe.easy.repository.jpa.JpaRecipeIngredientRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long>, JpaRecipeIngredientRepository {
}
