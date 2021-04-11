create table myrecipes.recipes (
    id integer generated always as identity primary key,
    title text not null,
    meal varchar(55) not null,
    difficulty varchar(55) not null,
    steps text not null
);

create table myrecipes.ingredients (
    id integer generated always as identity primary key,
    name varchar(255) not null
);

create table myrecipes.recipe_ingredients (
    id integer generated always as identity primary key,
    recipe_id integer not null,
    ingredient_id integer not null,
    constraint fk_recipe foreign key (recipe_id) references myrecipes.recipes(id),
    constraint fk_ingredient foreign key (ingredient_id) references myrecipes.ingredients(id),
    amount decimal not null,
    unit varchar(55) not null
);