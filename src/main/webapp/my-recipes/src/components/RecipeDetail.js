import React, {useEffect, useState} from "react";
import Baked from "./img/lm4rceme60edquisbnwb.jpeg";
import {useParams} from "react-router-dom";
import './css/RecipeDetail.css';
import axios from "axios";


function RecipeDetail() {

    const recipeIngredient = {
        recipeIngredientId: {
            ingredientId: '',
            recipeId: ''
        },
        amount: '',
        unit: '',
    };
    const recipe = {
        id: '',
        title: '',
        meal: '',
        difficulty: '',
        recipeIngredients: [recipeIngredient],
        steps: ''
    };
    const recipeId = useParams();
    const [recipeState, setRecipeState] = useState(recipe);
    const [ingredientList, setIngredientList] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8080/api/my-recipes/" + recipeId.id)
            .then(response => {
                if (response.data != null) {
                    console.log(response.data);
                    setRecipeState({
                        title: response.data.title,
                        meal: response.data.meal,
                        difficulty: response.data.difficulty,
                        steps: response.data.steps
                    });
                    setIngredientList(response.data.ingredientSet);
                }
            });
    }, []);


    return (
        <div className={"container"} style={{marginTop: "60px", width: "80%"}}>
            <div className={"row"}>
                <div className={"col-4"}>
                    <img className={"img-fluid"} src={Baked} alt={"..."}/>
                    <div className={"col"}>
                        <br/>
                        <h5>Ingredients</h5>
                        <ul>
                            {ingredientList.map((ingredient, index) => {
                                return (
                                    <li key={index}>
                                        {ingredient.name} ({ingredient.amount} {ingredient.unit})
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className={"col-8"}>
                    <h3 style={{fontWeight: "600"}}>{recipeState.title}</h3>
                    <div className={"row"}>
                        <div className={"col"}>
                            <h6>Meal: {recipeState.meal} </h6>
                        </div>
                        <div className={"col"}>
                            <h6>Difficulty: {recipeState.difficulty} </h6>
                        </div>
                    </div>
                    <br/>
                    <div className={"col"}>
                        <h5>Steps: </h5>
                        <p>{recipeState.steps}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail;