import React, {useEffect, useState} from "react";
import {useForm} from 'react-hook-form';
import './css/Recipe.css';
import axios from "axios";


function Recipe() {

    const units = [
        "unit",
        "g",
        "kg",
        "l",
        "ml"
    ];
    const meals = [
        "Breakfast",
        "Lunch",
        "Dinner"
    ];
    const difficulties = [
        "Easy",
        "Medium",
        "Hard"
    ];
    const ingredient = {
        id: '',
        name: ''
    };

    const {register, handleSubmit, errors} = useForm();

    const [ingredients, getIngredients] = useState([ingredient]);
    const [ingredientId, setIngredientId] = useState(0);
    const [ingredientName, setIngredientName] = useState('');
    const [ingredientList, setIngredientList] = useState([]);

    const [title] = useState('');
    const [meal, setMeal] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [ingredientAmount, setIngredientAmount] = useState('');
    const [ingredientUnit, setIngredientUnit] = useState('');

    const [titleError, setTitleError] = useState('');
    const [mealError, setMealError] = useState('');
    const [difficultyError, setDifficultyError] = useState('');
    const [ingredientNameError, setIngredientNameError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [unitError, setUnitError] = useState('');

    useEffect(() => {
        getAllIngredients();
    }, []);

    function getAllIngredients() {
        axios.get("http://localhost:8080/api/ingredients")
            .then(response => {
                getIngredients(response.data);
            });
    }

    function handleOnChangeMeal(event) {
        const meal = event.target.value;
        setMeal(meal);
    }

    function handleOnChangeDifficulty(event) {
        const difficulty = event.target.value;
        setDifficulty(difficulty);
    }

    function handleOnChangeIngredient(event) {
        const ingredientName = event.target.value;
        setIngredientName(ingredientName);

        let ingredientId = ingredients.find((ingredient) => ingredient.name === ingredientName);
        setIngredientId(ingredientId.id);
    }

    function handleOnChangeAmount(event) {
        const ingredientAmount = event.target.value;
        setIngredientAmount(ingredientAmount);
    }

    function recipeValidation() {
        if (title === "") {
            setTitleError("Please add a title")
        } else setTitleError(null);
        if (meal === "") {
            setMealError("Please pick a meal");
        } else setMealError(null);
        if (difficulty === "") {
            setDifficultyError("Please pick the level of difficulty");
        } else setDifficultyError(null);
    }

    function ingredientValidation() {
        if (ingredientName === "") {
            setIngredientNameError("Please pick an ingredient");
        } else setIngredientNameError(null);
        if (ingredientAmount === "") {
            setAmountError("Please add an amount needed");
        } else setAmountError(null);
        if (ingredientUnit === "") {
            setUnitError("Please pick the unit");
        } else setUnitError(null);
    }

    function handleAddedIngredient() {
        ingredientValidation();
        const ingredientDetail = {
            'id': ingredientId,
            'name': ingredientName,
            'amount': ingredientAmount,
            'unit': ingredientUnit
        };
        if (ingredientAmount !== "" && ingredientUnit !== "") {
            return setIngredientList(ingredientList => [...ingredientList, ingredientDetail]);
        }
    }

    function onSubmit(data) {

        recipeValidation();

        const recipe = {
            title: data.title,
            meal: data.meal,
            difficulty: data.difficulty,
            steps: data.steps,
            ingredientSet: ingredientList
        };
        console.log(recipe);

        axios.post("http://localhost:8080/api/recipes", recipe)
            .then(response => {
                console.log(response.data);
            }).catch(error => console.log(error))
            .then(refreshPage);
    }

    function refreshPage() {
        window.location.reload();
    }

    return (
        <form className={"form-recipe"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"form-recipe-head"}>
                <label htmlFor={"title"}>Title</label>
                <input className={"form-control"}
                       name={"title"}
                       ref={register({
                           required: true
                       })}/>
                {titleError && <p>{titleError}</p>}
                <div className={"row"}>
                    <div className={"col"}>
                        <label htmlFor={"meal"}>Meal</label>
                        <select className={"form-select"}
                                defaultValue={"Select"}
                                name={"meal"}
                                onChange={handleOnChangeMeal}
                                ref={register({
                                    required: true
                                })}>
                          d  <option value={"Select"} disabled>Select</option>
                            {meals.map((meal, index) => {
                                return (<option key={index}>{meal}</option>)
                            })}
                        </select>
                        {mealError && <p>{mealError}</p>}
                    </div>
                    <div className={"col"}>
                        <label htmlFor={"difficulty"}>Difficulty</label>
                        <select className={"form-select"}
                                defaultValue={"Select"}
                                name={"difficulty"}
                                onChange={handleOnChangeDifficulty}
                                ref={register({required: true})}>
                            <option value={"Select"} disabled>Select</option>
                            {difficulties.map((difficulty, index) => {
                                return (
                                    <option key={index}>{difficulty}</option>
                                );
                            })}
                        </select>
                        {difficultyError && <p>{difficultyError}</p>}
                    </div>
                </div>
                <label htmlFor={"ingredients"}>Ingredients</label>
                <select className={"form-select"}
                        name={"ingredients"}
                        defaultValue={"Select"}
                        onChange={handleOnChangeIngredient}
                        ref={register({required: true})}>
                    <option value={"Select"} disabled>Select</option>
                    {ingredients.map(ingredient => {
                        return (
                            <option key={ingredient.id}>{ingredient.name}</option>
                        );
                    })}
                </select>
                {ingredientNameError && <p>{ingredientNameError}</p>}
                <div className={"row"}>
                    <div className={"col"}>
                        <label>Amount</label>
                        <input className={"form-control"}
                               name={"amount"}
                               type={"number"}
                               onChange={handleOnChangeAmount}
                               ref={register({
                                   required: true
                               })}/>
                        {amountError && <p>{amountError}</p>}
                    </div>
                    <div className={"col"}>
                        <label>Unit</label>
                        <input className={"form-control"}
                               name={"unit"}
                               id={"unitDataList"}
                               list={"unitDatalistOptions"} onChange={e => setIngredientUnit(e.target.value)}
                               ref={register({
                                   required: true
                               })}/>
                        <datalist id={"unitDatalistOptions"}>
                            {units.map((unit, index) => {
                                return (
                                    <option key={index} value={unit}/>
                                )
                            })}
                        </datalist>
                        {unitError && <p>{unitError}</p>}
                    </div>
                </div>
                <div className={"row"}>
                    <input className={"btn btn-primary"} type={"button"} value={"Add"}
                           onClick={handleAddedIngredient}/>
                </div>
                <div className={"row"}>
                    <ul className={"list-group list-group-flush"} ref={register}>
                        {ingredientList.map((ingredient, index) => {
                            return (
                                <li className={"list-group-item"} key={index}>
                                    {ingredient.name} - {ingredient.amount} {ingredient.unit}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className={"form-recipe-bottom"}>
                <label>Steps</label>
                <textarea className={"form-control"} name={"steps"} rows="6" ref={register({
                    required: "Please add the instruction for your recipe"
                })}/>
                {errors.steps && <p>{errors.steps.message}</p>}
                <input type={"submit"}/>
            </div>
        </form>
    )
}

export default Recipe;