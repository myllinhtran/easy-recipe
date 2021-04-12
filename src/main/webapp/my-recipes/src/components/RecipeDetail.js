import React, {useEffect} from "react";
import Baked from "./img/lm4rceme60edquisbnwb.jpeg";
import './css/RecipeDetail.css';

function RecipeDetail() {

    const recipe = {
        title: '',
        meal: '',
        difficulty: '',
        ingredientSet: ''
    };

    useEffect(() => {
        getRecipe();
    });

    const getRecipe = (props) => {

    };

    return (
        <div className={"container"} style={{marginTop: "60px", width: "60%"}}>
            <div className={"row"}>
                <div className={"col-4"}>
                    <img className={"img-fluid"} src={Baked} alt={"..."}/>
                    <div className={"col"}><h5>Ingredients: </h5></div>
                </div>
                <div className={"col-8"}>
                    <h3>Recipe Title</h3>
                    <div className={"row"}>
                        <div className={"col"}>
                            <h5>Meal: </h5>
                        </div>
                        <div className={"col"}>
                            <h5>Difficulty: </h5>
                        </div>
                    </div>
                    <div className={"col"}><h5>Steps: </h5></div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail;