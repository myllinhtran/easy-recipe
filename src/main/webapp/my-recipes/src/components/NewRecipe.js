import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import './css/NewRecipe.css';
import units from "./util/Unit";
import meals from "./util/Meal";
import difficulties from "./util/Difficulty";
import axios from "axios";


function NewRecipe() {

    const {register, handleSubmit, errors} = useForm();

    const ingredient = {id: '', name: ''};
    const [ingredientId, setIngredientId] = useState(0);
    const [ingredientName, setIngredientName] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [ingredients, setIngredients] = useState([ingredient]);
    const [ingredientList, setIngredientList] = useState([]);

    const [ingredientError, setIngredientError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [unitError, setUnitError] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/api/ingredients").then(response => {
            setIngredients(response.data)
        });
    }, []);

    const onSubmit = (data) => {

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

        alert("Your recipe has been saved");
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const handleOnChangeIngredient = (event) => {
        const name = event.target.value;
        setIngredientName(name);
        let ingredient = ingredients.find((ingredient) => ingredient.name === name);
        setIngredientId(ingredient.id);
    };

    const handleIngredientList = (event) => {
        if (ingredientName === "") {
            setIngredientError("* Ingredients are required");
        } else setIngredientError(null);
        if (amount === 0) {
            setAmountError("* Amount is required");
        } else setAmountError(null);
        if (unit === "") {
            setUnitError("* Unit is required");
        } else setUnitError(null);

        const ingredientDetail = {
            'id': ingredientId,
            'name': ingredientName,
            'amount': amount,
            'unit': unit
        };

        if (ingredientId !== 0 && ingredientName !== "" && amount !== 0 && unit !== "") {
            console.log(ingredientDetail);
            return setIngredientList(ingredientList => [...ingredientList, ingredientDetail]);
        }
    };

    return (
        <form className={"form-recipe"} onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor={"title"}>Title</label>
            <input className={"form-control"} name={"title"} type={"text"}
                   ref={register({
                       required: {value: true, message: "* Title is required"},
                       minLength: {value: 5, message: "* Title is too short"},
                       maxLength: {value: 100, message: "* Title exceeds the maximum characters"}
                   })}/>
            {errors.title && <p>{errors.title.message}</p>}

            <div className={"row"}>
                <div className={"col"}>
                    <label htmlFor={"meal"}>Meal</label>
                    <select className={"form-select"} name={"meal"} defaultValue={"Select..."}
                            ref={register({
                                required: true,
                                pattern: {value: /^(?!Select)/, message: "* Meal is required"}
                            })}>
                        <option value={"Select..."} disabled>Select...</option>
                        {meals.map((meal, index) => {
                            return (<option key={index}>{meal}</option>)
                        })}
                    </select>
                    {errors.meal && <p>{errors.meal.message}</p>}
                </div>
                <div className={"col"}>
                    <label htmlFor={"difficulty"}>Difficulty</label>
                    <select className={"form-select"} name={"difficulty"} defaultValue={"Select..."}
                            ref={register({
                                required: true,
                                pattern: {value: /^(?!Select)/, message: "* Difficulty is required"}
                            })}>
                        <option value={"Select..."} disabled>Select...</option>
                        {difficulties.map((difficulty, index) => {
                            return (<option key={index}>{difficulty}</option>)
                        })}
                    </select>
                    {errors.difficulty && <p>{errors.difficulty.message}</p>}
                </div>
            </div>

            <label htmlFor={"ingredients"}>Ingredients</label>
            <select className={"form-select"} name={"ingredients"} defaultValue={"Select..."}
                    onChange={handleOnChangeIngredient}
                    ref={register({
                        required: true,
                        pattern: {value: /^(?!Select)/, message: "* Ingredients is required"}
                    })}>
                <option value={"Select..."} disabled>Select...</option>
                {ingredients.map(ingredient => {
                    return (<option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>)
                })}
            </select>
            {errors.ingredients && <p>{errors.ingredients.message}</p>}
            {ingredientError && <p>{ingredientError}</p>}

            <div className={"row"}>
                <div className={"col"}>
                    <label htmlFor={"amount"}>Amount</label>
                    <input className={"form-control"} name={"amount"} type={"number"}
                           onChange={e => setAmount(e.target.value)}
                           ref={register({
                               required: {value: true, message: "* Amount is required"},
                               min: {value: 0, message: "* Amount must not be zero"},
                               max: {value: 1000000, message: "* Amount is too big"}
                           })}/>
                    {errors.amount && <p>{errors.amount.message}</p>}
                    {amountError && <p>{amountError}</p>}
                </div>
                <div className={"col"}>
                    <label htmlFor={"unit"}>Unit</label>
                    <select className={"form-select"} name={"unit"} defaultValue={"Select..."}
                            onChange={e => setUnit(e.target.value)}
                            ref={register({
                                required: true,
                                pattern: {value: /^(?!Select)/, message: "* Unit is required"}
                            })}>
                        <option value={"Select..."} disabled>Select...</option>
                        {units.map((unit, index) => {
                            return (<option key={index}>{unit}</option>)
                        })}
                    </select>
                    {errors.unit && <p>{errors.unit.message}</p>}
                    {unitError && <p>{unitError}</p>}
                </div>
            </div>

            <input type={"button"} value={"Add Ingredient"} onClick={handleIngredientList}/>

            <label htmlFor={"steps"}>Steps</label>
            <textarea className={"form-control"} name={"steps"} rows={"5"}
                      ref={register({
                          required: {value: true, message: "* Steps is required"},
                          minLength: {value: 50, message: "* Steps are too short"},
                      })}/>
            {errors.steps && <p>{errors.steps.message}</p>}
            <input type={"submit"}/>

        </form>
    )
}

export default NewRecipe;