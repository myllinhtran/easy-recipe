package com.recipe.easy.model.wrapper;

import java.util.Objects;

public class IngredientWrapper {

    private Long id;
    private String name;
    private Double amount;
    private String unit;

    public IngredientWrapper() {
    }

    public IngredientWrapper(Long id, String name, Double amount, String unit) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.unit = unit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IngredientWrapper that = ( IngredientWrapper ) o;
        return Objects.equals(id, that.id) &&
               Objects.equals(name, that.name) &&
               Objects.equals(amount, that.amount) &&
               Objects.equals(unit, that.unit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, amount, unit);
    }

    @Override
    public String toString() {
        return "IngredientWrapper{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", amount=" + amount +
               ", unit='" + unit + '\'' +
               '}';
    }
}
