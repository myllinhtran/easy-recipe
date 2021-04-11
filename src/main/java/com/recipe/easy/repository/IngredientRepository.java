package com.recipe.easy.repository;

import com.recipe.easy.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
