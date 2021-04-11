import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./css/Homepage.css";
import Baked from "./img/lm4rceme60edquisbnwb.jpeg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDumbbell, faUtensils} from "@fortawesome/free-solid-svg-icons";


function Homepage() {

    // Store the recipes in a state variable.
    // We are passing an empty array as the default value.
    const [recipes, setRecipes] = useState([{
        id: '',
        title: '',
        meal: '',
        difficulty: '',
        steps: ''
    }]);

    const iconMeal = <FontAwesomeIcon icon={faUtensils}/>;
    const iconDifficulty = <FontAwesomeIcon icon={faDumbbell}/>;

    // The useEffect() hook fires any time that the component is rendered.
    // An empty array is passed as the second argument so that the effect only fires once.
    useEffect(() => {
        getAllRecipes()
    }, []);

    function getAllRecipes() {
        axios.get("http://localhost:8080/api/recipes")
            .then(response => {
                setRecipes(response.data); // update a new state
                console.log(response.data);
            });
    }

    function displayNavBar() {
        return (
            <div className={"nav-bar"}>
                <div className="card text-center">
                    <div className="card-body">
                        <h2 className="card-title">Find your recipes</h2>
                        <a href="new" className="btn btn-primary">New Recipe</a>
                        <a href="my-recipes" className="btn btn-primary">My Recipes</a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"container-fluid"}>
            {displayNavBar()}
            <div className={"row"}>
                {recipes.map(recipe => {
                    return (
                        <div className={"col-sm-2"} key={recipe.id}>
                            <div className={"card"}>
                                <img className={"card-img-top"} src={Baked} alt={"baked"}/>
                                <div className={"card-body"}>
                                    <h5 className={"card-title"}>{recipe.title}</h5>
                                    <div className="row text-muted">
                                        <div className={"col-sm"}>
                                            {iconMeal} {recipe.meal}<br/>
                                        </div>
                                        <div className={"col-sm"}>
                                            {iconDifficulty} {recipe.difficulty}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Homepage;