package com.recipe.easy.repository.jpa.impl;

import com.recipe.easy.repository.jpa.JpaRecipeIngredientRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Repository
public class JpaRecipeIngredientRepositoryImpl implements JpaRecipeIngredientRepository {

    @PersistenceContext
    private EntityManager entityManager;
}
