import React, {useEffect, useState} from "react";
import Baked from "./img/lm4rceme60edquisbnwb.jpeg";
import {useParams, useHistory} from "react-router-dom";
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
    const [ingredients, setIngredients] = useState([]);

    const history = useHistory();


    useEffect(() => {
        axios.get("http://localhost:8080/api/recipes/" + recipeId.id)
            .then(response => {
                if (response.data != null) {
                    console.log(response.data);
                    setRecipeState({
                        title: response.data.title,
                        meal: response.data.meal,
                        difficulty: response.data.difficulty,
                        steps: response.data.steps
                    });
                    setIngredients(response.data.ingredientSet);
                }
            }).catch(error => console.log(error));
    }, []);

    const displaySteps = () => {
        const steps = recipeState.steps;
        return steps.split('\n').map((str, index) => <p key={index} className={"steps"}>{str}</p>);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        history.push("/update/" + recipeId.id);
    };

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete("http://localhost:8080/api/recipes/" + recipeId.id)
            .then(response => console.log(response.data))
            .then(history.push("/"))
            .catch(error => console.log(error));
        window.location.reload();
    };


    return (
        <div className={"container"} style={{marginTop: "60px", marginBottom: "60px", width: "80%"}}>
            <div className={"row"}>
                <div className={"col-4"}>
                    <img className={"img-fluid"} src={Baked} alt={"..."}/>
                    <div className={"col"}>
                        <br/>
                        <h5>Ingredients</h5>
                        <ul>
                            {ingredients.map((ingredient, index) => {
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
                        {displaySteps()}
                    </div>
                    <div className={"row justify-content-start"}>
                        <div className={"col-2"}>
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                        <div className={"col-3"}>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail;