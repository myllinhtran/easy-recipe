import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useParams, useHistory} from "react-router-dom";
import './css/RecipeUpdate.css';
import units from "./util/Unit";
import meals from "./util/Meal";
import difficulties from "./util/Difficulty";
import axios from "axios";


function RecipeUpdate() {

    const recipe = {
        title: '',
        meal: '',
        difficulty: '',
        steps: '',
        ingredientSet: ''
    };
    const recipeId = useParams();
    const ingredient = {id: '', name: ''};

    const [currentRecipe, setCurrentRecipe] = useState(recipe);

    const [ingredientId, setIngredientId] = useState(0);
    const [ingredientName, setIngredientName] = useState('');
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const [ingredients, setIngredients] = useState([ingredient]);
    const [ingredientList, setIngredientList] = useState([]);

    const {register, handleSubmit, errors} = useForm();
    const history = useHistory();

    useEffect(() => {
        axios.get("https://infinite-caverns-36724.herokuapp.com/api/recipes/" + recipeId.id)
            .then(response => {
                console.log(response.data);
                setCurrentRecipe({
                    title: response.data.title,
                    meal: response.data.meal,
                    difficulty: response.data.difficulty,
                    steps: response.data.steps,
                });
                setIngredientList(response.data.ingredientSet);
            }).catch(error => console.log(error));

        axios.get("https://infinite-caverns-36724.herokuapp.com/api/ingredients")
            .then(response => {
                setIngredients(response.data)
            })
            .catch(error => console.log(error));
    }, []);

    const onSubmit = (data) => {
        const recipe = {
            id: recipeId.id,
            title: data.title,
            meal: data.meal,
            difficulty: data.difficulty,
            steps: data.steps,
            ingredientSet: ingredientList
        };
        axios.put("https://infinite-caverns-36724.herokuapp.com/api/recipes/" + recipeId.id, recipe)
            .then(response => {
                console.log(response.data);
            }).catch(error => console.log(error));
        // alert("Your recipe has been updated");
    };

    const handleOnChangeIngredient = (event) => {
        event.preventDefault();
        const name = event.target.value;
        setIngredientName(name);
        let ingredient = ingredients.find((ingredient) => ingredient.name === name);
        setIngredientId(ingredient.id);
    };

    const handleIngredientList = (event) => {
        event.preventDefault();

        const ingredientDetail = {
            'id': ingredientId,
            'name': ingredientName,
            'amount': amount,
            'unit': unit
        };

        if (ingredientId !== 0 && ingredientName !== "" && amount !== 0 && unit !== "") {
            if (ingredientList.some(ingredient => ingredient.name === ingredientDetail.name)) {
                alert("Ingredient already exists!");
            } else {
                console.log(ingredientDetail);
                return setIngredientList(ingredientList => [...ingredientList, ingredientDetail]);
            }
        }
    };

    const handleRemoveIngredientItem = (event) => {
        event.preventDefault();
        let array = [...ingredientList];
        let index = array.indexOf(event.target.value);
        array.splice(index, 1);
        setIngredientList(array);
    };

    return (
        <form className={"form-recipe"} onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor={"title"}>Title</label>
            <input className={"form-control"} name={"title"} type={"text"} defaultValue={currentRecipe.title}
                   ref={register({
                       required: {value: true, message: "* Title is required"},
                       minLength: {value: 5, message: "* Title is too short"},
                       maxLength: {value: 100, message: "* Title exceeds the maximum characters"}
                   })}/>
            {errors.title && <p>{errors.title.message}</p>}

            <div className={"row"}>
                <div className={"col"}>
                    <label htmlFor={"meal"}>Meal</label>
                    <select className={"form-select"} name={"meal"} defaultValue={currentRecipe.meal}
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
                    <select className={"form-select"} name={"difficulty"} defaultValue={currentRecipe.difficulty}
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
                </div>
            </div>

            <input className={"btn-ingredients"} type={"button"} value={"Add"} style={{marginTop: "10px"}}
                   onClick={handleIngredientList}/>

            <ul className={"list-group"} ref={register} style={{marginTop: "20px", border: "none"}}>
                {ingredientList.map((ingredient, index) => {
                    return (
                        <li className={"list-group-item"} key={index} style={{border: "none"}}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    {ingredient.name} ( {ingredient.amount} {ingredient.unit} )
                                </div>
                                <div className={"col"}>
                                    <button className={"btn-ingredients-list"} onClick={handleRemoveIngredientItem}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

            <label htmlFor={"steps"}>Steps</label>
            <textarea className={"form-control"} name={"steps"} rows={"5"} defaultValue={currentRecipe.steps}
                      ref={register({
                          required: {value: true, message: "* Steps is required"},
                          minLength: {value: 50, message: "* Steps are too short"},
                      })}/>
            {errors.steps && <p>{errors.steps.message}</p>}

            <div className={"row justify-content-center"}>
                <div className={"col"}>
                    <input type={"submit"} value={"save"}/>
                </div>
                <div className={"col"}>
                    <input type={"reset"} value={"reset"}/>
                </div>
            </div>

        </form>
    )
}

export default RecipeUpdate;