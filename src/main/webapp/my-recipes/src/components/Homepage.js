import React, {useEffect, useState} from "react";
import axios from 'axios';
import "./css/Homepage.css";
import Baked from "./img/lm4rceme60edquisbnwb.jpeg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDumbbell, faUtensils} from "@fortawesome/free-solid-svg-icons";


function Homepage() {

    const link = {
        textDecoration: "none",
        color: "black"
    };

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
        axios.get("https://infinite-caverns-36724.herokuapp.com/api/recipes")
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
                        <a href="/recipe/new" className="btn btn-primary">New Recipe</a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"container-fluid"} style={{marginBottom: "60px"}}>
            {displayNavBar()}
            <div className={"row"}>
                {recipes.map(recipe => {
                    return (
                        <div className={"col-sm-3"} key={recipe.id}>
                            <div className={"card"}>
                                <a href={"/recipe/detail/" + recipe.id}><img className={"card-img-top"} src={Baked} alt={"baked"}/></a>
                                <div className={"card-body"}>
                                    <a href={"/detail/" + recipe.id} style={link}><h5 className={"card-title"}>{recipe.title}</h5></a>
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