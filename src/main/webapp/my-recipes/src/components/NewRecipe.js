import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import './css/NewRecipe.css';
import units from "./util/Unit";
import meals from "./util/Meal";
import difficulties from "./util/Difficulty";
import axios from "axios";


function NewRecipe() {

    const ingredient = {id: '', name: ''};

    const {register, handleSubmit, errors} = useForm();
    const [ingredients, setIngredients] = useState([ingredient]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/ingredients").then(response => {
            setIngredients(response.data)
        });
    }, []);

    const onSubmit = (data) => {
        console.log(data);
        alert("Form is submitted");
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

            <label className={"form-label"} htmlFor={"ingredients"}>Ingredients</label>
            <input className={"form-control"} name={"ingredients"}
                   id={"ingredientDataList"} list={"ingredientDataListOptions"}
                   ref={register({
                       required: {value: true, message: "* Ingredients are required"}
                   })}/>
            <datalist id={"ingredientDataListOptions"}>
                {ingredients.map(ingredient => {
                    return (<option key={ingredient.id}>{ingredient.name}</option>)
                })}
            </datalist>
            {errors.ingredients && <p>{errors.ingredients.message}</p>}

            <div className={"row"}>
                <div className={"col"}>
                    <label htmlFor={"amount"}>Amount</label>
                    <input className={"form-control"} name={"amount"} type={"number"}
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

            <input type={"button"} value={"Add Ingredient"}/>

            <label htmlFor={"steps"}>Steps</label>
            <textarea className={"form-control"} name={"steps"} rows={"5"}
                      ref={register({
                          required: {value: true, message: "* Steps must not be empty"},
                          minLength: {value: 50, message: "* Steps are too short"},
                      })}/>
            {errors.steps && <p>{errors.steps.message}</p>}
            <input type={"submit"}/>

        </form>
    )
}

export default NewRecipe;